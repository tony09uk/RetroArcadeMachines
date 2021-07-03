using Amazon.DynamoDBv2.DataModel;

namespace RetroArcadeMachines.Data.Contracts
{
    [DynamoDBTable("Roadmaps")] // todo: how to stop duplicating the table name in here in repository
    public class RoadmapItemModel
    {
        [DynamoDBHashKey]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsStarted { get; set; }
        public int PercentageCompleted { get; set; }
        public int Order { get; set; }
    }
}
