using AutoMapper;
using RetroArcadeMachines.Services.Write.Models;
using RetroArcadeMachines.Shared.Models;

namespace RetroArcadeMachines.Services.Write
{
    public class MappingConfiguration : Profile
    {
        public MappingConfiguration()
        {
            CreateMap<LocationDetailsDto, LocationOverviewModel>();
            CreateMap<LocationDetailsDto, LocationDetailsModel>()
                .ForMember(x => x.GameOverviewList, opt => opt.Ignore());
        }
    }
}
