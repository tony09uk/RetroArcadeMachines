using Ardalis.GuardClauses;
using AutoMapper;
using RetroArcadeMachines.Data.Read.Interfaces;
using RetroArcadeMachines.Data.Write.Interfaces;
using RetroArcadeMachines.Services.Write.Exceptions;
using RetroArcadeMachines.Services.Write.Models;
using RetroArcadeMachines.Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public LocationDetailsService(
            IMapper mapper,
            IReadRepository<LocationDetailsModel> readLocationDetailsRepository,
            IReadRepository<GameModel> readGamesRepository,
            IWriteRepository<LocationDetailsModel> locationDetailsRepository,
            IWriteRepository<LocationOverviewModel> locationOverviewRepository)
        {
            _mapper = Guard.Against.Null(mapper, nameof(mapper), nameof(IMapper));
            _locationDetailsRepository = Guard.Against.Null(locationDetailsRepository, nameof(locationDetailsRepository), nameof(IWriteRepository<LocationDetailsModel>));
            _locationOverviewRepository = Guard.Against.Null(locationOverviewRepository, nameof(locationOverviewRepository), nameof(IWriteRepository<LocationOverviewModel>));
            _readLocationDetailsRepository = Guard.Against.Null(readLocationDetailsRepository, nameof(readLocationDetailsRepository), nameof(IReadRepository<LocationDetailsModel>)); ;
            _readGamesRepository = Guard.Against.Null(readGamesRepository, nameof(readGamesRepository), nameof(IReadRepository<GameModel>));
        }

        public async Task<WriteRequestResult> Add(LocationDetailsDto locationDetails)
        {
            try
            {
                var locationDetailsModel = _mapper.Map<LocationDetailsModel>(locationDetails);

                var gameIds = locationDetails.GameOverviewList.Keys.ToList();
                locationDetailsModel.GameOverviewList = await CreateValidGamesList(gameIds.ConvertAll(Guid.Parse));

                var locationOverviewModel = _mapper.Map<LocationOverviewModel>(locationDetails);

                var locationExists = await GetLocationIdOrDefault(locationDetailsModel);

                if(locationExists != default(Guid))
                {
                    return new WriteRequestResult { ItemId = locationExists, Status = WriteRequestStatus.Duplicate };
                }

                var locationId = Guid.NewGuid();

                locationDetailsModel.Id = locationId;
                locationOverviewModel.Id = locationId;

                var locationDetailsTask = _locationDetailsRepository.Add(locationDetailsModel);
                var locationOverviewTask = _locationOverviewRepository.Add(locationOverviewModel);

                await Task.WhenAll(locationDetailsTask, locationOverviewTask);

                return new WriteRequestResult { ItemId = null, Status = WriteRequestStatus.Success };
            }
            catch (ValueNotFoundInDatabaseException ex)
            {
                // todo: do something when this is found. expectation is that a user will have selected values retrived from the DB only
                return new WriteRequestResult { ItemId = null, Status = WriteRequestStatus.Failed };
            }
            catch (Exception ex)
            {
                // todo: revise this to look for specific error
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

        private async Task<Dictionary<string, string>> CreateValidGamesList(IEnumerable<Guid> ids)
        {
            List<GameModel> validGames = await _readGamesRepository.Get(ids);

            if (ids.Count() == validGames.Count)
            {
                return validGames.ToDictionary(keySelector: x => x.Id.ToString(), elementSelector: x => x.Title);
            }
            
            throw new ValueNotFoundInDatabaseException($"Game count did not match game count found in DB: {validGames.Count}. Game count provided: {ids.Count()}");
        }
    }
}
