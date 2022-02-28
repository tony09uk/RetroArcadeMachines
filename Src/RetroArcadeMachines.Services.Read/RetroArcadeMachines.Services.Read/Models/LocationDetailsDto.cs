using RetroArcadeMachines.Shared.Models;
using System.Collections.Generic;

namespace RetroArcadeMachines.Services.Read.Models
{
    public class LocationDetailsDto : LocationDto
    {
        public string Synopsis { get; set; }
        public string EmailAddress { get; set; }
        public string Website { get; set; }
        public string Lat { get; set; }
        public string Lng { get; set; }
        public AddressModel Address { get; set; }
        public IEnumerable<string> PhoneNumberList { get; set; }
        public IEnumerable<BusinessHoursModel> BusinessHoursList { get; set; }
        public IEnumerable<GameOverviewDto> GameOverviewList { get; set; }
        public IEnumerable<string> ImageUrlList { get; set; }
    }
}
