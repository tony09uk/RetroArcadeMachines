﻿using AutoMapper;
using RetroArcadeMachines.Data.Read.Models;
using RetroArcadeMachines.Services.Read.Models;

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
