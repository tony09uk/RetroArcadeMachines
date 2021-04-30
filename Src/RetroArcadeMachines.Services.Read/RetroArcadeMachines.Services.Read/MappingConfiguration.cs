using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using RetroArcadeMachines.Data.Read.Models;
using RetroArcadeMachines.Services.Read.ViewModels;

namespace RetroArcadeMachines.Services.Read
{
    public class MappingConfiguration : Profile
    {
        public MappingConfiguration()
        {
            CreateMap<RoadmapItemModel, RoadmapItemDto>();
        }
    }
}
