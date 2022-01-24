using System;
using System.Collections.Generic;

namespace RetroArcadeMachines.Shared.Models.Requests
{
    public class LocationDetailsRequestModel
    {
        public string Name { get; set; } // add location
        public bool IsRetroGamesOnly { get; set; } // more info
        public decimal? EntryPrice { get; set; } // more info
        public decimal Rating { get; set; } // more info
        public bool IsChildFriendly { get; set; } // more info
        public bool IsFoodServed { get; set; } // more info
        public string EmailAddress { get; set; } // auto
        public string Website { get; set; } // auto
        public string Lat { get; set; } // auto
        public string Lng { get; set; } // auto
        public AddressModel Address { get; set; } // add location
        public IEnumerable<string> PhoneNumberList { get; set; } // auto
        public IEnumerable<BusinessHoursRequestModel> BusinessHoursList { get; set; } // auto
        public IEnumerable<AssignedGamesRequestModel> AssignedGamesList { get; set; } // assign games
        public IEnumerable<string> ImageUrlList { get; set; }
    }
}
