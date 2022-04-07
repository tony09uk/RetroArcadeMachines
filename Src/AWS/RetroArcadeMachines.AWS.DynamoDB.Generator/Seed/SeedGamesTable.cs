using Newtonsoft.Json;
using RetroArcadeMachines.AWS.DynamoDB.Generator.Extensions;
using RetroArcadeMachines.AWS.DynamoDB.Generator.Seed.DataFileModels;
using RetroArcadeMachines.Shared.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    class SeedGamesTable : ISeedTable<GameModel>
    {
        private readonly ISeedTable<GenreModel> _genresSeedTable;
        private readonly ISeedTable<DeveloperModel> _developersSeedTable;

        public SeedGamesTable(
            ISeedTable<GenreModel> genresSeedTable,
            ISeedTable<DeveloperModel> developersSeedTable)
        {
            _genresSeedTable = genresSeedTable;
            _developersSeedTable = developersSeedTable;
        }

        public List<GameModel> Data()
        {
            var games = new List<GameModel>();
            var loadedGames = LoadGameData();

            foreach (GamesDataModel game in loadedGames)
            {
                var id = Guid.NewGuid();
                if (game.Title == "Teenage Mutant Ninja Turtles")
                {
                    // temp solution will be resolved on the next iteration
                    id = new Guid("63c8e8a3-d9e9-4660-8a36-86e241929cb3");
                }

                games.Add(new GameModel
                {
                    Id = id,
                    Title = game.Title,
                    ReleaseYear = game.Year.ToNullableInt(),
                    MaxPlayers = game.MaxPlayers.ToNullableInt(),
                    GenreList = game.Genres?.Split(',').ToList(),
                    DeveloperList = game.Manufacturer?.Split(',').ToList()
                });
            }

            return games;
        }

        private IEnumerable<GamesDataModel> LoadGameData()
        {
            using (var reader = new StreamReader("Seed/DataFiles/GamesData.json"))
            {
                string json = reader.ReadToEnd();
                return JsonConvert.DeserializeObject<IEnumerable<GamesDataModel>>(json);
            }
        }
    }
}
