using Amazon.DynamoDBv2.DataModel;

namespace RetroArcadeMachines.Shared.Models
{
    [DynamoDBTable("TableTracker")]
    public class TableTrackerModel
    {
        [DynamoDBHashKey]
        public string Name { get; set; }
        public string DateTime { get; set; }
    }
}
