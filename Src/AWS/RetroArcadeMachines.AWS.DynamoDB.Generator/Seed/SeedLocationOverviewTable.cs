using RetroArcadeMachines.AWS.DynamoDB.Generator;
using RetroArcadeMachines.Shared.Models;
using System;
using System.Collections.Generic;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    class SeedLocationOverviewTable : ISeedTable<LocationOverviewModel>
    {
        public List<LocationOverviewModel> Data()
        {
            return new List<LocationOverviewModel>
            {
                new LocationOverviewModel
                {
                    Id = new Guid("e5ab74b8-184f-4a35-ab1a-bc17101fc765"),
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
