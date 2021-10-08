using System.Collections.Generic;

namespace RetroArcadeMachines.Services.Read.Models
{
    public class LocationDetailsDto : LocationOverviewDto
    {
        public string Synopsis { get; set; }
        public string EmailAddress { get; set; }
        public string Website { get; set; }
        public string Lat { get; set; }
        public string Lng { get; set; }
        public Address Address { get; set; }
        public IEnumerable<PhoneNumber> PhoneNumberList { get; set; }
        public IEnumerable<BusinessHours> BusinessHoursList { get; set; }
        public IEnumerable<GameOverviewDto> GameOverviewList { get; set; }
        public IEnumerable<string> ImageUrlList { get; set; }
    }
}
