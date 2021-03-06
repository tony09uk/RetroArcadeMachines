using AutoMapper;
using RetroArcadeMachines.Data.Contracts;
using RetroArcadeMachines.Data.Read.Interfaces;
using RetroArcadeMachines.Services.Read.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Services.Read
{
    public class RoadmapService : IRoadmapService
    {
        private readonly IReadRepository<RoadmapItemModel> _roadmapRepository;
        private readonly IMapper _mapper;

        public RoadmapService(
            IMapper mapper,
            IReadRepository<RoadmapItemModel> roadmapRepository)
        {
            _roadmapRepository = roadmapRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RoadmapItemDto>> Get()
        {
            try
            {
                IEnumerable<RoadmapItemModel> roadmapitems = await _roadmapRepository.Get();
                var roadMapItems = _mapper.Map<IEnumerable<RoadmapItemDto>>(roadmapitems);
                return roadMapItems.OrderBy(x => x.Order);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
