using Ardalis.GuardClauses;
using AutoMapper;
using RetroArcadeMachines.Data.Read.Interfaces;
using RetroArcadeMachines.Services.Read.Models;
using RetroArcadeMachines.Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Services.Read
{
    public class LocationDetailsService : ILocationDetailsService
    {
        private readonly ILocationOverviewService _locationOverviewService;
        private readonly IReadRepository<LocationDetailsModel> _locationDetailsRepository;
        private readonly IGamesService _gamesService;
        private readonly IMapper _mapper;

        public LocationDetailsService(
            ILocationOverviewService locationOverviewService,
            IReadRepository<LocationDetailsModel> locationDetailsRepository,
            IMapper mapper,
            IGamesService gamesService)
        {
            _locationOverviewService = Guard.Against.Null(locationOverviewService, nameof(locationOverviewService), nameof(ILocationOverviewService));
            _locationDetailsRepository = Guard.Against.Null(locationDetailsRepository, nameof(locationDetailsRepository), nameof(IReadRepository<LocationDetailsModel>));
            _mapper = Guard.Against.Null(mapper, nameof(mapper), nameof(IMapper));
            _gamesService = Guard.Against.Null(gamesService, nameof(gamesService), nameof(IReadRepository<GameModel>));
        }

        public async Task<LocationDetailsDto> Get(Guid locationOverviewId)
        {
            try
            {
                Task<LocationOverviewDto> locationOverviewTask = _locationOverviewService.Get(locationOverviewId);
                Task<LocationDetailsModel> locationDetailsTask = _locationDetailsRepository.Get(locationOverviewId);

                await Task.WhenAll(locationOverviewTask, locationDetailsTask);

                if(locationDetailsTask == null)
                {
                    return null;
                }

                var ids = locationDetailsTask.Result.GameOverviewList.Keys.ToList();

                IEnumerable<GameOverviewDto> gamesList = 
                    await _gamesService.Get(ids.ConvertAll(Guid.Parse)).ConfigureAwait(false);

                var locationDetails = _mapper.Map<LocationDetailsDto>(locationDetailsTask.Result);
                locationDetails.GameOverviewList = gamesList;
                Map(locationOverviewTask.Result, locationDetails);

                return locationDetails;
            } 
            catch(Exception) // todo: watch for specific exception types
            {
                throw;
            }

        }

        private void Map(LocationOverviewDto locationsOverview, LocationDetailsDto locationsDetails)
        {
            locationsDetails.Name = locationsOverview.Name;
            locationsDetails.IsRetroGamesOnly = locationsOverview.IsRetroGamesOnly;
            locationsDetails.Town = locationsOverview.Town;
            locationsDetails.EntryPrice = locationsOverview.EntryPrice;
            locationsDetails.Rating = locationsOverview.Rating;
            locationsDetails.IsChildFriendly = locationsOverview.IsChildFriendly;
            locationsDetails.IsFoodServed = locationsOverview.IsFoodServed;
        }
    }
}
