using AutoMapper;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using RetroArcadeMachines.Services.Write.Models;
using RetroArcadeMachines.Shared.Models;
using RetroArcadeMachines.Shared.Models.Requests;

[assembly: FunctionsStartup(typeof(RetroArcadeMachines.AzureFunctions.Write.Startup))]
namespace RetroArcadeMachines.AzureFunctions.Write
{
    public class MappingConfiguration : Profile
    {
        public MappingConfiguration()
        {
            CreateMap<LocationDetailsRequestModel, LocationDetailsDto>();
            CreateMap<BusinessHoursRequestModel, BusinessHoursModel>();
        }
    }
}
