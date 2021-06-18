using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Data.Read.Interfaces;
using RetroArcadeMachines.Data.Read.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Read.AWS
{
    public class DynamoDbGamesRepository : IGamesRepository
    {
        public const string TableName = "Games";
        private readonly IDynamoDBContext _context;

        public DynamoDbGamesRepository(IDynamoDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<GameModel>> Get()
        {
            return await _context.ScanAsync<GameModel>(new List<ScanCondition>()).GetRemainingAsync();
        }

        public Task<GameModel> Get(string id)
        {
            return _context.LoadAsync<GameModel>(id);
        }

        public Task Add(GameModel roadmapItem)
        {
            return _context.SaveAsync(roadmapItem);
        }

        public Task AddMany(List<GameModel> roadmapItems)
        {
            var batch = _context.CreateBatchWrite<GameModel>();
            batch.AddPutItems(roadmapItems);
            return batch.ExecuteAsync();
        }

        public Task Update(GameModel roadmapItem)
        {
            throw new NotImplementedException();
        }

        public Task Delete(string id)
        {
            return _context.DeleteAsync<GameModel>(id);
        }
    }
}
