using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Data.Read.AWS;

namespace RetroArcadeMachines.Data.Read.Models
{
    [DynamoDBTable(DynamoDbRoadmapRepository.TableName)]
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
