using RetroArcadeMachines.Shared.Models;
using System;
using System.Collections.Generic;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    class SeedLocationDetailsTable : ISeedTable<LocationDetailsModel>
    {
        public List<LocationDetailsModel> Data()
        {
            return new List<LocationDetailsModel>
            {
                new LocationDetailsModel
                {
                    Id = new Guid("e5ab74b8-184f-4a35-ab1a-bc17101fc765"),
                    Synopsis = "This is where information on the location would be added. It can be long or short and is added by the user",
                    EmailAddress = "info@.arcadeclub.co.uk",
                    Website = "https://www.arcadeclub.co.uk/leeds",
                    Address = new AddressModel
                    {
                        LineOne = "Unit 3, Abbey Retail Park",
                        LineTwo = "Savins Mill Way",
                        LineThree = "Kirkstall",
                        Town = "Leeds",
                        Postcode1 = "LS5",
                        Postcode2 = "3RP"
                    },
                    PhoneNumberList = new List<PhoneNumberModel>
                    {
                        new PhoneNumberModel { StdCode = "01482", Number = "212380" }
                    },
                    BusinessHoursList = new List<BusinessHoursModel>
                    {
                        new BusinessHoursModel { DayOfTheWeek = DaysOfTheWeek.Monday, OpeningTime = null, ClosingTime = null },
                        new BusinessHoursModel { DayOfTheWeek = DaysOfTheWeek.Tuesday, OpeningTime = null, ClosingTime = null },
                        new BusinessHoursModel { DayOfTheWeek = DaysOfTheWeek.Wednesday, OpeningTime = null, ClosingTime = null },
                        new BusinessHoursModel { DayOfTheWeek = DaysOfTheWeek.Thursday, OpeningTime = "16:00", ClosingTime = "23:00" },
                        new BusinessHoursModel { DayOfTheWeek = DaysOfTheWeek.Friday, OpeningTime = "18:00", ClosingTime = "00:00" },
                        new BusinessHoursModel { DayOfTheWeek = DaysOfTheWeek.Friday, OpeningTime = "11:00", ClosingTime = "23:00" },
                        new BusinessHoursModel { DayOfTheWeek = DaysOfTheWeek.Friday, OpeningTime = "11:00", ClosingTime = "20:00" }
                    },
                    GameOverviewList = new List<Guid>
                    {
                        new Guid("63c8e8a3-d9e9-4660-8a36-86e241929cb3")
                    },
                    ImageUrlList = new List<string>
                    {
                        "https://via.placeholder.com/1142x440",
                    },
                    IsRetroGamesOnly = true,
                    Lat = "53.8155546",
                    Lng = "-1.6034085"
                }
            };
        }
    }
}
