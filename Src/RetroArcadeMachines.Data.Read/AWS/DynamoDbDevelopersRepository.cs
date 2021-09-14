using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Shared.Models;

namespace RetroArcadeMachines.Data.Read.AWS
{
    public class DynamoDbDevelopersRepository : DynamoDbBaseRepository<DeveloperModel>
    {
        public const string TableName = "Developers";

        public DynamoDbDevelopersRepository(IDynamoDBContext context) : base(context)
        {
        }
    }
}
