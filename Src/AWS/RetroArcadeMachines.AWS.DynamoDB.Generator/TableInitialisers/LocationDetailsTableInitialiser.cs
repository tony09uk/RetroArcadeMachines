using Amazon.DynamoDBv2;
using RetroArcadeMachines.Shared.Models;
using RetroArcadeMachines.Data.Write.AWS;
using RetroArcadeMachines.Data.Write.Interfaces;
using System.Threading.Tasks;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    class LocationDetailsTableInitialiser : BaseTableInitialiser, ITableInitialiser
    {
        private readonly IWriteRepository<LocationDetailsModel> _locationDetailsRepository;
        private readonly ISeedTable<LocationDetailsModel> _seedTable;

        public LocationDetailsTableInitialiser(
            IAmazonDynamoDB dynamoDBClient,
            IWriteRepository<LocationDetailsModel> locationDetailsRepository,
            ISeedTable<LocationDetailsModel> seedTable) : base(dynamoDBClient, DynamoDbLocationDetailsRepository.TableName)
        {
            _locationDetailsRepository = locationDetailsRepository;
            _seedTable = seedTable;
        }

        public async Task Create()
        {
            await base.Create(
                    nameof(LocationDetailsModel.Id),
                    typeof(LocationDetailsModel));
        }

        public override Task<bool> Seed()
        {
            return _locationDetailsRepository.AddMany(_seedTable.Data());
        }
    }
}
