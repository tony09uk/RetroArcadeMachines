using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Shared.Models;

namespace RetroArcadeMachines.Data.Read.AWS
{
    public class DynamoDbLocationDetailsRepository : DynamoDbBaseRepository<DeveloperModel>
    {
        public const string TableName = "LocationsDetails";

        public DynamoDbLocationDetailsRepository(IDynamoDBContext context) : base(context)
        {
        }
    }
}
