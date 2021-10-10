using Amazon.DynamoDBv2;
using RetroArcadeMachines.Shared.Models;
using RetroArcadeMachines.Data.Write.AWS;
using RetroArcadeMachines.Data.Write.Interfaces;
using System.Threading.Tasks;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    class RoadmapsTableInitialiser : BaseTableInitialiser, ITableInitialiser
    {
        private readonly IWriteRepository<RoadmapItemModel> _roadmapRepository;
        private readonly ISeedTable<RoadmapItemModel> _seedTable;

        public RoadmapsTableInitialiser(
            IAmazonDynamoDB dynamoDBClient,
            IWriteRepository<RoadmapItemModel> roadmapRepository,
            ISeedTable<RoadmapItemModel> seedTable) : base(dynamoDBClient, DynamoDbRoadmapRepository.TableName)
        {
            _roadmapRepository = roadmapRepository;
            _seedTable = seedTable;
        }

        public async Task Create()
        {
            await base.Create(
                    nameof(RoadmapItemModel.Id),
                    nameof(RoadmapItemModel.PercentageCompleted),
                    nameof(RoadmapItemModel.PercentageCompleted),
                    typeof(RoadmapItemModel));
        }

        public override Task<bool> Seed()
        {
            return _roadmapRepository.AddMany(_seedTable.Data());
        }
    }
}
