using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Data.Read.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Read.AWS
{
    public class DynamoDbRoadmapRepository : IRoadmapRepository
    {
        private readonly IAmazonDynamoDB _dynamoDBClient;
        private readonly IDynamoDBContext _context;

        public DynamoDbRoadmapRepository(IAmazonDynamoDB dynamoDBClient, IDynamoDBContext context)
        {
            _dynamoDBClient = dynamoDBClient;
            _context = context;
        }

        public async Task<IEnumerable<RoadmapItemModel>> Get()
        {
            return await _context.ScanAsync<RoadmapItemModel>(new List<ScanCondition>()).GetRemainingAsync();
        }

        public Task<RoadmapItemModel> Get(string id)
        {
            return _context.LoadAsync<RoadmapItemModel>(id);
        }

        public Task Add(RoadmapItemModel roadmapItem)
        {
            return _context.SaveAsync(roadmapItem);
        }

        public Task AddMany(List<RoadmapItemModel> roadmapItems)
        {
            var batch = _context.CreateBatchWrite<RoadmapItemModel>();
            batch.AddPutItems(roadmapItems);
            return batch.ExecuteAsync();
        }

        public Task Update(RoadmapItemModel roadmapItem)
        {
            throw new NotImplementedException();
        }

        public Task Delete(string id)
        {
            return _context.DeleteAsync<RoadmapItemModel>(id);
        }
    }
}
