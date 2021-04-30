using AutoMapper;
using RetroArcadeMachines.Data.Read;
using RetroArcadeMachines.Data.Read.Models;
using RetroArcadeMachines.Services.Read.ViewModels;
using System;
using System.Collections.Generic;

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
            _roadmapRepository = new RoadmapRepository();
            _mapper = mapper;
        }

        public IEnumerable<RoadmapItemDto> Get()
        {
            IEnumerable<RoadmapItemModel> roadmapitems = _roadmapRepository.Get();
            return _mapper.Map<IEnumerable<RoadmapItemDto>>(roadmapitems);
        }
    }
}
