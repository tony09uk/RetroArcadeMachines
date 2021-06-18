using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Data.Read.Interfaces;
using RetroArcadeMachines.Data.Read.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Read.AWS
{
    public class DynamoDbGenreRepository : IGenresRepository
    {
        public const string TableName = "Genre";
        private readonly IDynamoDBContext _context;

        public DynamoDbGenreRepository(IDynamoDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<GenreModel>> Get()
        {
            return await _context.ScanAsync<GenreModel>(new List<ScanCondition>()).GetRemainingAsync();
        }

        public Task<GenreModel> Get(string id)
        {
            return _context.LoadAsync<GenreModel>(id);
        }

        public Task Add(GenreModel roadmapItem)
        {
            return _context.SaveAsync(roadmapItem);
        }

        public Task AddMany(List<GenreModel> roadmapItems)
        {
            var batch = _context.CreateBatchWrite<GenreModel>();
            batch.AddPutItems(roadmapItems);
            return batch.ExecuteAsync();
        }

        public Task Update(GenreModel roadmapItem)
        {
            throw new NotImplementedException();
        }

        public Task Delete(string id)
        {
            return _context.DeleteAsync<GenreModel>(id);
        }
    }
}
