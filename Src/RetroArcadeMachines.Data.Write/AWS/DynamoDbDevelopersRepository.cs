using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Data.Contracts;

namespace RetroArcadeMachines.Data.Write.AWS
{
    public class DynamoDbDevelopersRepository : DynamoDbBaseRepository<DeveloperModel>
    {
        public const string TableName = "Developers";

        public DynamoDbDevelopersRepository(IDynamoDBContext context) : base(context)
        {
        }
    }
}
