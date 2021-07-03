using Amazon.DynamoDBv2.DataModel;
using System;

namespace RetroArcadeMachines.Data.Contracts
{
    [DynamoDBTable("Genre")] // todo: how to stop duplicating the table name in here in repository
    public class GenreModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string WikipediaUrl { get; set; }
        public int Random { get; set; }//temp test
    }
}
