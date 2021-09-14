using Amazon.DynamoDBv2.DataModel;
using System;

namespace RetroArcadeMachines.Shared.Models
{
    [DynamoDBTable("Developers")] // todo: how to stop duplicating the table name in here in repository
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
