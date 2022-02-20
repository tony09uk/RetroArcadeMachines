using Amazon.DynamoDBv2;
using RetroArcadeMachines.Shared.Models;
using System.Threading.Tasks;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    class TableTrackTableInitialiser : BaseTableInitialiser, ITableInitialiser
    {
        public TableTrackTableInitialiser(
            IAmazonDynamoDB dynamoDBClient) : base(dynamoDBClient, "TableTracker")
        {
        }

        public async Task Create()
        {
            await base.Create(
                nameof(TableTrackerModel.Name),
                typeof(TableTrackerModel));
        }

        public override Task<bool> Seed()
        {
            return Task.FromResult(true);
        }
    }
}
