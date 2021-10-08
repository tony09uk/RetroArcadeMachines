using RetroArcadeMachines.Services.Read.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace RetroArcadeMachines.Services.Read
{
    public class LocationOverviewService : ILocationOverviewService
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

        public async Task<LocationOverviewDto> Get(int locationOverviewId)
        {
            // todo: get this value from the DB
            IEnumerable<LocationOverviewDto> item = await Get();
            return item.FirstOrDefault(x => x.Id == locationOverviewId);
        }
    }
}
