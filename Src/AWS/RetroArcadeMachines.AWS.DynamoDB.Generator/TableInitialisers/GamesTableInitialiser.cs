using Amazon.DynamoDBv2;
using RetroArcadeMachines.Data.Write.AWS;
using RetroArcadeMachines.Data.Write.Interfaces;
using RetroArcadeMachines.Shared.Models;
using System.Threading.Tasks;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    class GamesTableInitialiser : BaseTableInitialiser, ITableInitialiser
    {
        private readonly IWriteRepository<GameModel> _gamesRepository;
        private readonly ISeedTable<GameModel> _seedTable;

        public GamesTableInitialiser(
            IAmazonDynamoDB dynamoDBClient,
            IWriteRepository<GameModel> gamesRepository,
            ISeedTable<GameModel> seedTable) : base(dynamoDBClient, DynamoDbGamesRepository.TableName)
        {
            _gamesRepository = gamesRepository;
            _seedTable = seedTable;
        }

        public async Task Create()
        {
            await base.Create(nameof(GameModel.Id), nameof(GameModel.ReleaseYear), nameof(GameModel.ReleaseYear));
        }

        public override Task<bool> Seed()
        {
            return _gamesRepository.AddMany(_seedTable.Data());
        }
    }
}
