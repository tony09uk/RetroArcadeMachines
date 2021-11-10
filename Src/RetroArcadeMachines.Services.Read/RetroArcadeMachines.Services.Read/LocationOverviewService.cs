using RetroArcadeMachines.Services.Read.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using RetroArcadeMachines.Data.Read.Interfaces;
using AutoMapper;
using RetroArcadeMachines.Shared.Models;
using System;
using Ardalis.GuardClauses;

namespace RetroArcadeMachines.Services.Read
{
    public class LocationOverviewService : ILocationOverviewService
    {
        private readonly IReadRepository<LocationOverviewModel> _locationOverviewRepository;
        private readonly IMapper _mapper;

        public LocationOverviewService(
            IMapper mapper,
            IReadRepository<LocationOverviewModel> locationOverviewRepository)
        {
            _mapper = Guard.Against.Null(mapper, nameof(mapper), nameof(IMapper));
            _locationOverviewRepository = Guard.Against.Null(locationOverviewRepository, nameof(locationOverviewRepository), nameof(IReadRepository<LocationOverviewModel>));
        }

        public async Task<IEnumerable<LocationOverviewDto>> Get()
        {
            try
            {
                IEnumerable<LocationOverviewModel> locationOverviewModelList = await _locationOverviewRepository.Get();
                return _mapper.Map<IEnumerable<LocationOverviewDto>>(locationOverviewModelList);
            }
            catch(Exception ex) // todo: define the specific exceptions are expected
            {
                // todo: add logging
                throw;
            }
        }

        public async Task<LocationOverviewDto> Get(Guid locationOverviewId)
        {
            LocationOverviewModel locationOverview = await _locationOverviewRepository.Get(locationOverviewId);
            return _mapper.Map<LocationOverviewDto>(locationOverview);
        }
    }
}
