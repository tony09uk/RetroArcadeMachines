using Amazon.DynamoDBv2.DataModel;
using System;

namespace RetroArcadeMachines.Shared.Models
{
    public class LocationBaseModel
    {
        [DynamoDBHashKey]
        public Guid Id { get; set; }
    }
}
