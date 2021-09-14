using RetroArcadeMachines.Shared.Models;
using System;
using System.Collections.Generic;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    class SeedGenresTable : ISeedTable<GenreModel>
    {
        public List<GenreModel> Data()
        {
            return new List<GenreModel>
            {
                new GenreModel
                {
                    Id = new Guid("a66df0af-4ee8-4fa5-8c91-ec57b30f23dd"),
                    Name = "Sports",
                    Description = "Attempts to simulate the practice of sports",
                    WikipediaUrl = "https://en.wikipedia.org/wiki/Sports_video_game",
                    Random = 12
                },
                new GenreModel
                {
                    Id = new Guid("2b205049-fc42-4f2e-8506-2d435c45ce4c"),
                    Name = "Beat 'em up",
                    Description = "Feature hand to hand combat against a large number of opponents",
                    WikipediaUrl = "https://en.wikipedia.org/wiki/Beat_%27em_up",
                    Random = 10
                },
            };
        }
    }
}
