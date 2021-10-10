using RetroArcadeMachines.Services.Read.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using RetroArcadeMachines.Data.Read.Interfaces;
using AutoMapper;
using RetroArcadeMachines.Shared.Models;

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
            //todo: gurd against null!
            _mapper = mapper;
            _locationOverviewRepository = locationOverviewRepository;
        }

        public async Task<IEnumerable<LocationOverviewDto>> Get()
        {
            // todo: handle exception
            IEnumerable<LocationOverviewModel> locationOverviewModelList = await _locationOverviewRepository.Get();
            return _mapper.Map<IEnumerable<LocationOverviewDto>>(locationOverviewModelList);
            //return new List<LocationOverviewDto>
            //{
            //    new LocationOverviewDto
            //    {
            //        Id = 1,
            //        Name = "Game Club",
            //        EntryPrice = 5.99M,
            //        Rating = 4,
            //        Town = "Leeds",
            //        IsChildFriendly = true,
            //        IsFoodServed = true
            //    }
            //};
        }

        public async Task<LocationOverviewDto> Get(int locationOverviewId)
        {
            // todo: get this value from the DB
            IEnumerable<LocationOverviewDto> item = await Get();
            return item.FirstOrDefault(x => x.Id == locationOverviewId);
        }
    }
}
