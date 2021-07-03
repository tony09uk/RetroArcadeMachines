using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Data.Contracts;

namespace RetroArcadeMachines.Data.Write.AWS
{
    public class DynamoDbGamesRepository : DynamoDbBaseRepository<GameModel>
    {
        public const string TableName = "Games";

        public DynamoDbGamesRepository(IDynamoDBContext context) : base(context)
        {
        }
    }
}
