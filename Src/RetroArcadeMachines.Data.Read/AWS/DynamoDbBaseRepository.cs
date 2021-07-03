using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Data.Read.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Read.AWS
{
    public class DynamoDbBaseRepository<T> : IReadRepository<T>
    {
        private readonly IDynamoDBContext _context;

        public DynamoDbBaseRepository(IDynamoDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<T>> Get()
        {
            return await _context.ScanAsync<T>(new List<ScanCondition>()).GetRemainingAsync();
        }

        public Task<T> Get(string id)
        {
            return _context.LoadAsync<T>(id);
        }
    }
}
