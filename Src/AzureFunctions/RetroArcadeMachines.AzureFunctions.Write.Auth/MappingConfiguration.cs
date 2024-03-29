﻿using AutoMapper;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using RetroArcadeMachines.Services.Write.Models;
using RetroArcadeMachines.Shared.Models;
using RetroArcadeMachines.Shared.Models.Requests;

[assembly: FunctionsStartup(typeof(RetroArcadeMachines.AzureFunctions.Write.Auth.Startup))]
namespace RetroArcadeMachines.AzureFunctions.Write.Auth
{
    public class MappingConfiguration : Profile
    {
        public MappingConfiguration()
        {
            CreateMap<LocationDetailsRequestModel, LocationDetailsDto>();
            CreateMap<LocationDetailsDto, LocationDetailsModel>();
            CreateMap<BusinessHoursRequestModel, BusinessHoursModel>();
            CreateMap<AssignedGamesRequestModel, AssignedGamesDto>();
        }
    }
}
