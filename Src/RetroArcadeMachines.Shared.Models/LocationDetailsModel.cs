using Amazon.DynamoDBv2.DataModel;
using System;
using System.Collections.Generic;

namespace RetroArcadeMachines.Shared.Models
{
    [DynamoDBTable("LocationsDetails")]
    public class LocationDetailsModel : LocationBaseModel
    {
        public string Synopsis { get; set; }
        public bool IsRetroGamesOnly { get; set; }
        public string EmailAddress { get; set; }
        public string Website { get; set; }
        public string Lat { get; set; }
        public string Lng { get; set; }
        public AddressModel Address { get; set; }
        public List<PhoneNumberModel> PhoneNumberList { get; set; }
        public List<BusinessHoursModel> BusinessHoursList { get; set; }
        public Dictionary<string, string> GameOverviewList { get; set; }
        public List<string> ImageUrlList { get; set; }
    }
}
