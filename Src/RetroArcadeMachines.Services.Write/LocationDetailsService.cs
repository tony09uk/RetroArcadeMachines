using Ardalis.GuardClauses;
using AutoMapper;
using RetroArcadeMachines.Data.Write.AWS;
using RetroArcadeMachines.Data.Write.Interfaces;
using RetroArcadeMachines.Services.Write.Models;
using RetroArcadeMachines.Shared.Models;
using System;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Services.Write
{
    public class LocationDetailsService : ILocationDetailsService
    {
        private readonly IMapper _mapper;
        private readonly IWriteRepository<LocationDetailsModel> _locationDetailsRepository;
        private readonly IWriteRepository<LocationOverviewModel> _locationOverviewRepository;

        public LocationDetailsService(
            IMapper mapper,
            IWriteRepository<LocationDetailsModel> locationDetailsRepository,
            IWriteRepository<LocationOverviewModel> locationOverviewRepository)
        {
            _mapper = Guard.Against.Null(mapper, nameof(mapper), nameof(IMapper));
            _locationDetailsRepository = Guard.Against.Null(locationDetailsRepository, nameof(locationDetailsRepository), nameof(IWriteRepository<LocationDetailsModel>));
            _locationOverviewRepository = Guard.Against.Null(locationOverviewRepository, nameof(locationOverviewRepository), nameof(IWriteRepository<LocationOverviewModel>));
        }

        public async Task<bool> Add(LocationDetailsDto locationDetails)
        {
            try
            {
                await _locationDetailsRepository.Add(_mapper.Map<LocationDetailsModel>(locationDetails));
                await _locationOverviewRepository.Add(_mapper.Map<LocationOverviewModel>(locationDetails));
            }
            catch(Exception ex)
            {
                
            }
            


            // todo: update client to pass all LocationDetails
            // todo: check that associated games are valid
            // todo: update db from postcode1 to postalcode1
            // todo: populate location overview table
            // todo: populate location details table
            // todo: populate town in locationoverview using the address.town property


            return true;
        }
    }
}
