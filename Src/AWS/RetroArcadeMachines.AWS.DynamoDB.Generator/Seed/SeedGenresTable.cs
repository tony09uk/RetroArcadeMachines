using Newtonsoft.Json;
using RetroArcadeMachines.AWS.DynamoDB.Generator.Seed.DataFileModels;
using RetroArcadeMachines.Shared.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    class SeedGenresTable : ISeedTable<GenreModel>
    {
        public List<GenreModel> Data()
        {
            var genreList = new List<GenreModel>();

            IEnumerable<GamesDataModel> loadedGames = LoadGameData();
            List<string> distinctGenres = loadedGames.GroupBy(x => x.Genres)
                                                    .Select(x => x.First())
                                                    .Select(x => x.Genres)
                                                    .ToList();

            foreach(var genre in distinctGenres)
            {
                genreList.Add(new GenreModel
                {
                    Id = Guid.NewGuid(),
                    Name = genre
                });
            }

            return genreList;
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
