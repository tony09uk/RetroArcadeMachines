using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Shared.Models;

namespace RetroArcadeMachines.Data.Read.AWS
{
    public class DynamoDbRoadmapRepository : DynamoDbBaseRepository<RoadmapItemModel>
    {
        public const string TableName = "Roadmaps";

        public DynamoDbRoadmapRepository(IDynamoDBContext context) : base(context)
        {
        }
    }
}
