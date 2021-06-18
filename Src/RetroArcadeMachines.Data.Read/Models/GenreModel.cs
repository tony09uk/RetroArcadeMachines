using Amazon.DynamoDBv2.DataModel;
using System;

namespace RetroArcadeMachines.Data.Read.Models
{
    [DynamoDBTable(DynamoDbGenreRepository.TableName)]
    public class GenreModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string WikipediaUrl { get; set; }

    }
}
