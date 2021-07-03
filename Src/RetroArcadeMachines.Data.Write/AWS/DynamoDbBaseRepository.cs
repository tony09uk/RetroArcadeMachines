using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Data.Write.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Write.AWS
{
    public class DynamoDbBaseRepository<T> : IWriteRepository<T>
    {
        private readonly IDynamoDBContext _context;

        public DynamoDbBaseRepository(IDynamoDBContext context)
        {
            _context = context;
        }

        public Task Add(T item)
        {
            return _context.SaveAsync(item);
        }

        public async Task<bool> AddMany(List<T> items)
        {
            BatchWrite<T> batch = _context.CreateBatchWrite<T>();
            batch.AddPutItems(items);
            await batch.ExecuteAsync();
            return true;
        }

        public Task Update(T item)
        {
            throw new NotImplementedException();
        }

        public Task Delete(string id)
        {
            return _context.DeleteAsync<T>(id);
        }
    }
}
