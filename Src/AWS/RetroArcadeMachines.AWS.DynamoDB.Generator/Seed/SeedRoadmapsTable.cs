using RetroArcadeMachines.Shared.Models;
using System;
using System.Collections.Generic;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    class SeedRoadmapsTable : ISeedTable<RoadmapItemModel>
    {
        public List<RoadmapItemModel> Data()
        {
            return new List<RoadmapItemModel>
            {
                new RoadmapItemModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Create Roadmap",
                    Description = "List upcoming features in the order that will be worked on",
                    IsStarted = true,
                    PercentageCompleted = 100,
                    Order = 0
                },
                new RoadmapItemModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Create contact form",
                    Description = "Allow user to contact me with ideas and suggestions",
                    IsStarted = true,
                    PercentageCompleted = 100,
                    Order = 1
                },
                new RoadmapItemModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Create games list page",
                    Description = "Alphbetically list games and basic information that are held in our database",
                    IsStarted = true,
                    PercentageCompleted = 100,
                    Order = 2
                },
                new RoadmapItemModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Create locations list page",
                    Description = "Alphbetically list all locations that have at least one game we hold in our database",
                    IsStarted = true,
                    PercentageCompleted = 100,
                    Order = 3
                },
                new RoadmapItemModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Search locations",
                    Description = "Allow searching of locations",
                    IsStarted = true,
                    PercentageCompleted = 100,
                    Order = 4
                },
                new RoadmapItemModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Search games",
                    Description = "Allow searching of games",
                    IsStarted = true,
                    PercentageCompleted = 100,
                    Order = 5
                },
                new RoadmapItemModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Membership area",
                    Description = "Allow users to login - this task will spawn many more and the list will be updated closer to the time",
                    IsStarted = true,
                    PercentageCompleted = 100,
                    Order = 5
                },
                new RoadmapItemModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Change roadmap progress display",
                    Description = "Update the numeric display to be represented by a progress bar",
                    IsStarted = true,
                    PercentageCompleted = 100,
                    Order = 6
                },
                new RoadmapItemModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Enable add US locations",
                    Description = "Allow for user to add locations outside the UK",
                    IsStarted = false,
                    PercentageCompleted = 0,
                    Order = 7
                },
                new RoadmapItemModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Allow locations editing",
                    Description = "Allow locations to be edited",
                    IsStarted = false,
                    PercentageCompleted = 0,
                    Order = 8
                },
                new RoadmapItemModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Locations near me",
                    Description = "Allows users to find locations near them by a single button click",
                    IsStarted = false,
                    PercentageCompleted = 0,
                    Order = 9
                }
            };
        }
    }
}
