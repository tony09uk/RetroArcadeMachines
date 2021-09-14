using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Shared.Models;

namespace RetroArcadeMachines.Data.Read.AWS
{
    public class DynamoDbGamesRepository : DynamoDbBaseRepository<GameModel>
    {
        public const string TableName = "Games";

        public DynamoDbGamesRepository(IDynamoDBContext context) : base(context)
        {
        }
    }
}
