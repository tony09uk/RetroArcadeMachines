using RetroArcadeMachines.Shared.Models;
using System;
using System.Collections.Generic;

namespace RetroArcadeMachines.Services.Write.Models
{
    public class LocationDetailsDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsRetroGamesOnly { get; set; }
        public string Town { get; set; }
        public decimal? EntryPrice { get; set; }
        public decimal Rating { get; set; }
        public bool IsChildFriendly { get; set; }
        public bool IsFoodServed { get; set; }
        public string Synopsis { get; set; }
        public string EmailAddress { get; set; }
        public string Website { get; set; }
        public string Lat { get; set; }
        public string Lng { get; set; }
        public AddressModel Address { get; set; }
        public IEnumerable<string> PhoneNumberList { get; set; }
        public IEnumerable<BusinessHoursModel> BusinessHoursList { get; set; }
        public List<AssignedGamesDto> GameOverviewList { get; set; }
        public IEnumerable<string> ImageUrlList { get; set; }
    }
}
