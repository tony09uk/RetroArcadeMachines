using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Data.Contracts;

namespace RetroArcadeMachines.Data.Read.AWS
{
    public class DynamoDbGenreRepository : DynamoDbBaseRepository<GenreModel>
    {
        public const string TableName = "Genre";

        public DynamoDbGenreRepository(IDynamoDBContext context) : base(context)
        {
        }
    }
}
