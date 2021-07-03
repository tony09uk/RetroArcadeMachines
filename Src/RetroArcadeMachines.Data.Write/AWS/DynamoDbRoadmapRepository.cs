using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Data.Contracts;

namespace RetroArcadeMachines.Data.Write.AWS
{
    public class DynamoDbRoadmapRepository : DynamoDbBaseRepository<RoadmapItemModel>
    {
        public const string TableName = "Roadmaps";

        public DynamoDbRoadmapRepository(IDynamoDBContext context) : base(context)
        {
        }
    }
}
