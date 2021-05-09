using AutoMapper;
using RetroArcadeMachines.Data.Read;
using RetroArcadeMachines.Data.Read.Models;
using RetroArcadeMachines.Services.Read.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Services.Read
{
    public class RoadmapService : IRoadmapService
    {
        private readonly IRoadmapRepository _roadmapRepository;
        private readonly IMapper _mapper;

        public RoadmapService(
            IMapper mapper,
            IRoadmapRepository roadmapRepository)
        {
            _roadmapRepository = roadmapRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RoadmapItemDto>> Get()
        {
            IEnumerable<RoadmapItemModel> roadmapitems = await _roadmapRepository.Get();
            return _mapper.Map<IEnumerable<RoadmapItemDto>>(roadmapitems);
        }
    }
}
