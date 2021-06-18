using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Data.Read.Interfaces;
using RetroArcadeMachines.Data.Read.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Read.AWS
{
    public class DynamoDbDevelopersRepository : IDevelopersRepository
    {
        public const string TableName = "Developers";
        private readonly IDynamoDBContext _context;

        public DynamoDbDevelopersRepository(IDynamoDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DeveloperModel>> Get()
        {
            return await _context.ScanAsync<DeveloperModel>(new List<ScanCondition>()).GetRemainingAsync();
        }

        public Task<DeveloperModel> Get(string id)
        {
            return _context.LoadAsync<DeveloperModel>(id);
        }

        public Task Add(DeveloperModel roadmapItem)
        {
            return _context.SaveAsync(roadmapItem);
        }

        public Task AddMany(List<DeveloperModel> roadmapItems)
        {
            var batch = _context.CreateBatchWrite<DeveloperModel>();
            batch.AddPutItems(roadmapItems);
            return batch.ExecuteAsync();
        }

        public Task Update(DeveloperModel roadmapItem)
        {
            throw new NotImplementedException();
        }

        public Task Delete(string id)
        {
            return _context.DeleteAsync<DeveloperModel>(id);
        }
    }
}
