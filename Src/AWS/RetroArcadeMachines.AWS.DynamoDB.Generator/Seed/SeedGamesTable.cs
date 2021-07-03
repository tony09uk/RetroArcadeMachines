using RetroArcadeMachines.Data.Contracts;
using System;
using System.Collections.Generic;
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
            var fightingGenre = _genresSeedTable.Data().FirstOrDefault(x => x.Name == "Beat 'em up");// todo: make this type safe
            var konamaniDeveloper = _developersSeedTable.Data().FirstOrDefault(x => x.Name == "Konami");
            //todo: get develer for this seed
            //todo: run it and see if it works
            return new List<GameModel>
            {
                new GameModel
                {
                    Id = new Guid("63c8e8a3-d9e9-4660-8a36-86e241929cb3"),
                    Title = "Teenage Mutant Ninja Turtles",
                    Description = "based on the first Teenage Mutant Ninja Turtles animated series that began airing two years earlier. In the game, up to four players control the titular Ninja Turtles, fighting through various levels to defeat the turtles' enemies, including the Shredder, Krang and the Foot Clan",
                    ReleaseYear = 1989,
                    MaxPlayers = 4,
                    ThumbnailUrl = "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Teenage_Mutant_Ninja_Turtles_%281989_arcade_game%29.jpg/220px-Teenage_Mutant_Ninja_Turtles_%281989_arcade_game%29.jpg",
                    VideoClipUrl = "https://youtu.be/uSOFl3e8RSw",
                    ImageUrlList = new List<string>
                    {
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGcYgCsKOfGEWMF_d9Y0oyVUI7VcAYGDEr2w&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Lrmf6Cvot6aQRBmvvIPfQdDljTz78MrC6w&usqp=CAU"
                    },
                    GenreList = new List<string>
                    {
                        fightingGenre.Name
                    },
                    DeveloperList = new List<string>
                    {
                        konamaniDeveloper.Name
                    }
                },
            };
        }
    }
}
