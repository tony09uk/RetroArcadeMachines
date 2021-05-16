using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Data.Read.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Read.AWS
{
    //todo: inject DynamoDBContext
    public class DynamoDbRoadmapRepository : IRoadmapRepository
    {
        private readonly IAmazonDynamoDB _dynamoDBClient;

        public DynamoDbRoadmapRepository(IAmazonDynamoDB dynamoDBClient)
        {
            _dynamoDBClient = dynamoDBClient;
        }

        public async Task<IEnumerable<RoadmapItemModel>> Get()
        {
            //await CreateTable();
            var context = new DynamoDBContext(_dynamoDBClient);
            return new List<RoadmapItemModel>();
        }

        public Task<RoadmapItemModel> Get(string id)
        {
            var context = new DynamoDBContext(_dynamoDBClient);
            return context.LoadAsync<RoadmapItemModel>(id);
        }

        public Task Add(RoadmapItemModel roadmapItem)
        {
            var context = new DynamoDBContext(_dynamoDBClient);
            return context.SaveAsync(roadmapItem);
        }

        public Task AddMany(List<RoadmapItemModel> roadmapItems)
        {
            var context = new DynamoDBContext(_dynamoDBClient);
            var batch = context.CreateBatchWrite<RoadmapItemModel>();
            batch.AddPutItems(roadmapItems);
            return batch.ExecuteAsync();
        }

        public Task Update(RoadmapItemModel roadmapItem)
        {
            throw new NotImplementedException();
        }

        public Task Delete(string id)
        {
            var context = new DynamoDBContext(_dynamoDBClient);
            return context.DeleteAsync<RoadmapItemModel>(id);
        }
    }
}
