using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Shared.Models;

namespace RetroArcadeMachines.Data.Read.AWS
{
    public class DynamoDbLocationOverviewRepository : DynamoDbBaseRepository<LocationOverviewModel>
    {
        public const string TableName = "LocationsOverview";

        public DynamoDbLocationOverviewRepository(IDynamoDBContext context) : base(context)
        {
        }
    }
}
