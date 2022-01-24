using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Shared.Models;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Write.AWS
{
    public class DynamoDbLocationDetailsRepository : DynamoDbBaseRepository<LocationDetailsModel>
    {
        public const string TableName = "LocationsDetails";

        public DynamoDbLocationDetailsRepository(IDynamoDBContext context) : base(context)
        {
        }

        public async Task<bool> Add()
        {
            return true;
        }
    }
}
