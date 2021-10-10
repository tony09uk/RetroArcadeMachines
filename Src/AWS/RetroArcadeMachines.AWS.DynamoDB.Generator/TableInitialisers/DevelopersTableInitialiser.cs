using Amazon.DynamoDBv2;
using RetroArcadeMachines.Shared.Models;
using RetroArcadeMachines.Data.Write.AWS;
using RetroArcadeMachines.Data.Write.Interfaces;
using System.Threading.Tasks;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    class DevelopersTableInitialiser : BaseTableInitialiser, ITableInitialiser
    {
        private readonly IWriteRepository<DeveloperModel> _developersRepository;
        private readonly ISeedTable<DeveloperModel> _seedTable;

        public DevelopersTableInitialiser(
            IAmazonDynamoDB dynamoDBClient,
            IWriteRepository<DeveloperModel> developersRepository,
            ISeedTable<DeveloperModel> seedTable) : base(dynamoDBClient, DynamoDbDevelopersRepository.TableName)
        {
            _developersRepository = developersRepository;
            _seedTable = seedTable;
        }

        public async Task Create()
        {
            await base.Create(
                    nameof(DeveloperModel.Id),
                    nameof(DeveloperModel.FoundedYear),
                    nameof(DeveloperModel.FoundedYear),
                    typeof(DeveloperModel));
        }

        public override Task<bool> Seed()
        {
            return _developersRepository.AddMany(_seedTable.Data());
        }
    }
}
