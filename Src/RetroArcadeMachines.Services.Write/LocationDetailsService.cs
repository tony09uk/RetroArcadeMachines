using Ardalis.GuardClauses;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RetroArcadeMachines.Data.Read.Interfaces;
using RetroArcadeMachines.Data.Write.Interfaces;
using RetroArcadeMachines.Services.Write.Exceptions;
using RetroArcadeMachines.Services.Write.Models;
using RetroArcadeMachines.Shared.Models;
using RetroArcadeMachines.Shared.Models.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Services.Write
{
    public class LocationDetailsService : ILocationDetailsService
    {
        private readonly IMapper _mapper;
        private readonly IReadRepository<LocationDetailsModel> _readLocationDetailsRepository;
        private readonly IReadRepository<GameModel> _readGamesRepository;
        private readonly IWriteRepository<LocationDetailsModel> _locationDetailsRepository;
        private readonly IWriteRepository<LocationOverviewModel> _locationOverviewRepository;
        private readonly ILogger<LocationDetailsService> _logger;
        private readonly HttpClient _httpClient;

        public LocationDetailsService(
            IMapper mapper,
            IReadRepository<LocationDetailsModel> readLocationDetailsRepository,
            IReadRepository<GameModel> readGamesRepository,
            IWriteRepository<LocationDetailsModel> locationDetailsRepository,
            IWriteRepository<LocationOverviewModel> locationOverviewRepository,
            ILogger<LocationDetailsService> logger,
            HttpClient httpClient)
        {
            _mapper = Guard.Against.Null(mapper, nameof(mapper), nameof(IMapper));
            _locationDetailsRepository = Guard.Against.Null(locationDetailsRepository, nameof(locationDetailsRepository), nameof(IWriteRepository<LocationDetailsModel>));
            _locationOverviewRepository = Guard.Against.Null(locationOverviewRepository, nameof(locationOverviewRepository), nameof(IWriteRepository<LocationOverviewModel>));
            _readLocationDetailsRepository = Guard.Against.Null(readLocationDetailsRepository, nameof(readLocationDetailsRepository), nameof(IReadRepository<LocationDetailsModel>)); ;
            _readGamesRepository = Guard.Against.Null(readGamesRepository, nameof(readGamesRepository), nameof(IReadRepository<GameModel>));
            _logger = Guard.Against.Null(logger, nameof(logger), nameof(ILogger<LocationDetailsService>));
            _httpClient = Guard.Against.Null(httpClient, nameof(httpClient), nameof(HttpClient));
        }

        public async Task<WriteRequestResult> Add(LocationDetailsDto locationDetails, string email)
        {
            _logger.LogInformation($"Executing Add in {nameof(LocationDetailsService)}");
            try
            {
                var locationDetailsModel = _mapper.Map<LocationDetailsModel>(locationDetails);

                var gameIds = locationDetails.GameOverviewList.Select(x => x.Id).ToList();
                locationDetailsModel.GameOverviewList = await CreateSelectedGamesList(gameIds.ConvertAll(Guid.Parse));

                var locationOverviewModel = _mapper.Map<LocationOverviewModel>(locationDetails);
                _logger.LogInformation($"{nameof(LocationOverviewModel)}: {JsonConvert.SerializeObject(locationOverviewModel)}");

                var locationExists = await GetLocationIdOrDefault(locationDetailsModel);
                _logger.LogInformation($"GetLocationIdOrDefault executed and returned {locationExists}");

                if (locationExists != default(Guid))
                {
                    await HandleDuplicateLocation(locationDetails.GameOverviewList, email);
                    return new WriteRequestResult { ItemId = locationExists, Status = WriteRequestStatus.Duplicate };
                }

                var locationId = Guid.NewGuid();

                locationDetailsModel.Id = locationId;
                locationOverviewModel.Id = locationId;

                // todo: how to undo a write if another fails -> https://stackoverflow.com/questions/51703022/rollback-with-dynamodb

                var locationDetailsTask = _locationDetailsRepository.Add(locationDetailsModel);
                var locationOverviewTask = _locationOverviewRepository.Add(locationOverviewModel);
                var handleManuallyAddedGamesTask = HandleManuallyAddedGames(locationDetails.GameOverviewList, email);

                await Task.WhenAll(locationDetailsTask, locationOverviewTask, handleManuallyAddedGamesTask);              

                return new WriteRequestResult { ItemId = null, Status = WriteRequestStatus.Success };
            }
            catch (ValueNotFoundInDatabaseException ex)
            {
                _logger.LogError($"{nameof(ValueNotFoundInDatabaseException)} was thrown with the message {ex.Message}. Request marked as failed");
                _logger.LogError($"{ex.InnerException}");
                await HandleError(ex, email);

                return new WriteRequestResult { ItemId = null, Status = WriteRequestStatus.Failed };
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError($"{nameof(HttpRequestException)} was thrown with the message {ex.Message}. Request marked as failed");
                _logger.LogError($"{ex.InnerException}");
                await HandleError(ex, email);

                return new WriteRequestResult { ItemId = null, Status = WriteRequestStatus.Failed };
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError($"{nameof(ArgumentNullException)} was thrown with the message {ex.Message}. Request marked as failed");
                _logger.LogError($"{ex.InnerException}");
                await HandleError(ex, email);

                return new WriteRequestResult { ItemId = null, Status = WriteRequestStatus.Failed };
            }
            catch (Exception ex)
            {
                // todo: revise this to look for specific error
                _logger.LogError($"{nameof(ArgumentNullException)} was thrown with the message {ex.Message}. Request marked as failed");
                _logger.LogError($"{ex.InnerException}");
                await HandleError(ex, email);

                return new WriteRequestResult { ItemId = null, Status = WriteRequestStatus.Failed };
            }
        }

        /// <summary>
        /// A temporary solution for checking existing address.
        /// Read repo needs to add another way of allowing a look up as this will be very expensive
        /// In addition a better implementation should be implemented here.
        /// </summary>
        /// <param name="locationDetailsModel"></param>
        /// <returns></returns>
        private async Task<Guid> GetLocationIdOrDefault(LocationDetailsModel locationDetailsModel)
        {
            IEnumerable<LocationDetailsModel> existingLocations = await _readLocationDetailsRepository.Get();

            var location = existingLocations.FirstOrDefault(x => 
                x.Address.Postalcode1 == locationDetailsModel.Address.Postalcode1 &&
                x.Address.Postalcode2 == locationDetailsModel.Address.Postalcode2 &&
                x.Address.LineOne == locationDetailsModel.Address.LineOne);

            return location == null ? default(Guid) : location.Id;
        }

        private async Task<Dictionary<string, string>> CreateSelectedGamesList(IEnumerable<Guid> ids)
        {
            List<GameModel> validGames = await _readGamesRepository.Get(ids.Distinct());

            if (validGames.Count > 0)
            {
                return validGames.ToDictionary(keySelector: x => x.Id.ToString(), elementSelector: x => x.Title);
            }

            return new Dictionary<string, string>();
        }

        private async Task HandleManuallyAddedGames(List<AssignedGamesDto> gameOverviewList, string email)
        {
            IEnumerable<AssignedGamesDto> manuallyAddedGames = gameOverviewList.Where(x => x.Id == default(Guid).ToString());
            if(manuallyAddedGames.Count() > 0)
            {
                var gamesAdded = JsonConvert.SerializeObject(manuallyAddedGames);

                var subject = $"Games manually added by {email}";
                var message = $"{email} has added the following games: {gamesAdded}";
                await PostManualResolutionContactForm(email, subject, message);
            }
        }

        private async Task HandleDuplicateLocation(List<AssignedGamesDto> gameOverviewList, string email)
        {
            if (gameOverviewList.Count() > 0)
            {
                var gamesAdded = JsonConvert.SerializeObject(gameOverviewList);

                var subject = $"Duplicate location added by {email}";
                var message = $"{email} has added the following games: {gamesAdded} to a location that already exists. Check to see if any of these games already exist for that location.";
                await PostManualResolutionContactForm(email, subject, message);
            }
        }

        private async Task HandleError(Exception ex, string email)
        {
            var exception = "";
            if(ex != null)
            {
                exception = JsonConvert.SerializeObject(ex);
                //exception = $"MESSAGE: {ex.Message} INNER EXCEPTION: {ex.InnerException} STACKTRACE: {ex.StackTrace}, DATA: {ex.Data}";
            }
            var subject = $"Exception: {email} added location";
            await PostManualResolutionContactForm(email, subject, exception);
        }

        private async Task PostManualResolutionContactForm(string email, string subject, string message)
        {
            var contactFormRequest = new ContactFormRequestModel
            {
                FirstName = "unknown",
                LastName = "unknown",
                Email = email,
                Subject = subject,
                Message = message
            };
            var json = JsonConvert.SerializeObject(contactFormRequest);

            StringContent httpContent = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
            await _httpClient.PostAsync("contact", httpContent);
        }

    }
}
