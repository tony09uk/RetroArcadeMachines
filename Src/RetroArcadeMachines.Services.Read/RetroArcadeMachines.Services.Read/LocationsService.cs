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
            try
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
            catch (Exception ex) //todo: watch for the expected exceptions only
            {
                throw ex;
            }
        }
    }
}
