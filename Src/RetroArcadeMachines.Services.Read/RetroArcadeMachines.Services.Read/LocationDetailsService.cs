using RetroArcadeMachines.Services.Read.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Services.Read
{
    public class LocationDetailsService : ILocationDetailsService
    {
        private readonly ILocationOverviewService _locationOverviewService;

        public LocationDetailsService(ILocationOverviewService locationOverviewService)
        {
            _locationOverviewService = locationOverviewService;
        }

        public async Task<LocationDetailsDto> Get(int locationOverviewId)
        {
            //todo: should only pass location overview.Id and will call different repos to build this data
            // locationOverview
            // locationDetails
            // locationDetails will return list of game id's then call games overview
            var locationOverview = await _locationOverviewService.Get(locationOverviewId);
            return new LocationDetailsDto
            {
                Id = locationOverview.Id,
                Name = locationOverview.Name,
                EntryPrice = locationOverview.EntryPrice,
                Rating = locationOverview.Rating,
                Town = locationOverview.Town,
                IsChildFriendly = locationOverview.IsChildFriendly,
                IsFoodServed = locationOverview.IsFoodServed,
                Synopsis = "This is where information on the location would be added. It can be long or short and is added by the user",
                EmailAddress = "info@.arcadeclub.co.uk",
                Website = "https://www.arcadeclub.co.uk/leeds",
                Address = new Address
                {
                    LineOne = "Unit 3, Abbey Retail Park",
                    LineTwo = "Savins Mill Way",
                    LineThree = ", Kirkstall",
                    Town = "Leeds",
                    Postcode1 = "LS5",
                    Postcode2 = "3RP"
                },
                PhoneNumberList = new List<PhoneNumber>
                {
                    new PhoneNumber { stdCode = "01482", number = "212380" }
                },
                BusinessHoursList = new List<BusinessHours>
                {
                    new BusinessHours { DayOfTheWeek = DaysOfTheWeek.Monday, OpeningTime = null, ClosingTime = null },
                    new BusinessHours { DayOfTheWeek = DaysOfTheWeek.Tuesday, OpeningTime = null, ClosingTime = null },
                    new BusinessHours { DayOfTheWeek = DaysOfTheWeek.Wednesday, OpeningTime = null, ClosingTime = null },
                    new BusinessHours { DayOfTheWeek = DaysOfTheWeek.Thursday, OpeningTime = "16:00", ClosingTime = "23:00" },
                    new BusinessHours { DayOfTheWeek = DaysOfTheWeek.Friday, OpeningTime = "18:00", ClosingTime = "00:00" },
                    new BusinessHours { DayOfTheWeek = DaysOfTheWeek.Friday, OpeningTime = "11:00", ClosingTime = "23:00" },
                    new BusinessHours { DayOfTheWeek = DaysOfTheWeek.Friday, OpeningTime = "11:00", ClosingTime = "20:00" }
                },
                GameOverviewList = new List<GameOverviewDto>
                {
                    new GameOverviewDto { Title = "Time Crisis"}
                },
                ImageUrlList = new List<string>
                {
                    "https://via.placeholder.com/1142x440",
                },
                IsRetroGamesOnly = true,
                Lat = "53.8155546",
                Lng = "-1.6034085"
            };
        }
    }
}
