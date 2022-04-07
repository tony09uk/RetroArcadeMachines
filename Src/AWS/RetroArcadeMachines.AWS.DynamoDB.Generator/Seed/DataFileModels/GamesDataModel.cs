using System;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator.Seed.DataFileModels
{
    class GamesDataModel
    {
        public string Title { get; set; }
        public string AlternateTitles { get; set; }
        public string Year { get; set; }
        public string Manufacturer { get; set; }
        public string Genres { get; set; }
        public string MaxPlayers { get; set; }
        public string PCBModels { get; set; }

        internal object ToList()
        {
            throw new NotImplementedException();
        }
    }
}
