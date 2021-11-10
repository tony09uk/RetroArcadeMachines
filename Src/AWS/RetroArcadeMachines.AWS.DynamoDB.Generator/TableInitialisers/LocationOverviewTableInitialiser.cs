using Amazon.DynamoDBv2;
using RetroArcadeMachines.Shared.Models;
using RetroArcadeMachines.Data.Write.AWS;
using RetroArcadeMachines.Data.Write.Interfaces;
using System.Threading.Tasks;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    class LocationOverviewTableInitialiser : BaseTableInitialiser, ITableInitialiser
    {
        private readonly IWriteRepository<LocationOverviewModel> _locationOverviewRepository;
        private readonly ISeedTable<LocationOverviewModel> _seedTable;

        public LocationOverviewTableInitialiser(
            IAmazonDynamoDB dynamoDBClient,
            IWriteRepository<LocationOverviewModel> locationOverviewRepository,
            ISeedTable<LocationOverviewModel> seedTable) : base(dynamoDBClient, DynamoDbLocationOverviewRepository.TableName)
        {
            _locationOverviewRepository = locationOverviewRepository;
            _seedTable = seedTable;
        }

        public async Task Create()
        {
            await base.Create(
                    nameof(LocationOverviewModel.Id),
                    typeof(LocationOverviewModel));
        }

        public override Task<bool> Seed()
        {
            return _locationOverviewRepository.AddMany(_seedTable.Data());
        }
    }
}
