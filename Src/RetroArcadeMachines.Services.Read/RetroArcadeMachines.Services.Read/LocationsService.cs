using RetroArcadeMachines.Services.Read.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Services.Read
{
    public class LocationsService
    {
        public async Task<IEnumerable<LocationOverviewDto>> Get()
        {
            return new List<LocationOverviewDto>
            {
                new LocationOverviewDto
                {
                    Id = 1,
                    Name = "Game Club",
                    EntryPrice = 5.99M,
                    Rating = 4,
                    Town = "Leeds",
                    IsChildFriendly = true,
                    IsFoodServed = true
                }
            };
        }
    }
}
