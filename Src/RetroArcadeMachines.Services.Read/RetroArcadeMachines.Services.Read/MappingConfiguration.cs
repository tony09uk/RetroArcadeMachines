using AutoMapper;
using RetroArcadeMachines.Services.Read.Models;
using RetroArcadeMachines.Shared.Models;

namespace RetroArcadeMachines.Services.Read
{
    public class MappingConfiguration : Profile
    {
        public MappingConfiguration()
        {
            CreateMap<RoadmapItemModel, RoadmapItemDto>();
            CreateMap<GameModel, GameOverviewDto>();
        }
    }
}
