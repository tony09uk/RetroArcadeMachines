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
    public class RoadmapService : IRoadmapService
    {
        private readonly IReadRepository<RoadmapItemModel> _roadmapRepository;
        private readonly IMapper _mapper;

        public RoadmapService(
            IMapper mapper,
            IReadRepository<RoadmapItemModel> roadmapRepository)
        {
            _roadmapRepository = Guard.Against.Null(roadmapRepository, nameof(roadmapRepository), nameof(IReadRepository<RoadmapItemModel>));
            _mapper = Guard.Against.Null(mapper, nameof(mapper), nameof(IMapper));
        }

        public async Task<IEnumerable<RoadmapItemDto>> Get()
        {
            try
            {
                IEnumerable<RoadmapItemModel> roadmapitems = await _roadmapRepository.Get();
                var roadMapItems = _mapper.Map<IEnumerable<RoadmapItemDto>>(roadmapitems);
                
                if(roadmapitems == null)
                {
                    return new List<RoadmapItemDto>();
                }
                
                return roadMapItems.OrderByDescending(x => x.Order);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
