using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Data.Read.AWS;
using System;

namespace RetroArcadeMachines.Data.Read.Models
{
    [DynamoDBTable(DynamoDbGamesRepository.TableName)]
    public class DeveloperModel
    {
        [DynamoDBHashKey]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public int FoundedYear { get; set; }
        public string Website { get; set; }
    }
}
