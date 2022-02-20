using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.Model;
using RetroArcadeMachines.Data.Write.Interfaces;
using RetroArcadeMachines.Shared.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Write.AWS
{
    public class DynamoDbBaseRepository<T> : IProviderWriteRepository<T>
    {
        private readonly IDynamoDBContext _context;

        public DynamoDbBaseRepository(IDynamoDBContext context)
        {
            _context = context;
        }

        public Task Add(T item)
        {
            Task task = _context.SaveAsync(item);
            UpdateTableTracker();
            return task;
        }

        public async Task<bool> AddMany(List<T> items)
        {
            BatchWrite<T> batch = _context.CreateBatchWrite<T>();
            batch.AddPutItems(items);
            await batch.ExecuteAsync();
            _ = UpdateTableTracker();

            return true;
        }

        public Task Update(T item)
        {
            throw new NotImplementedException();
        }

        public Task Delete(string id)
        {
            var task = _context.DeleteAsync<T>(id);
            UpdateTableTracker();
            return task;
        }

        /// <summary>
        /// This is a stop gap to track table data update times. Rplace with table trigger and AWS lambda
        /// Note: this can cause issues around caching requests if this call fails and the preciding update succeeds
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        private Task UpdateTableTracker()
        {
            var client = new AmazonDynamoDBClient();
            string tableName = "TableTracker";

            var request = new PutItemRequest
            {
                TableName = tableName,
                Item = new Dictionary<string, AttributeValue>()
                {
                      { nameof(TableTrackerModel.Name), new AttributeValue { S = nameof(T) }},
                      { nameof(TableTrackerModel.DateTime), new AttributeValue { S = DateTime.UtcNow.ToString("s", System.Globalization.CultureInfo.InvariantCulture) }},
                }
            };
            return client.PutItemAsync(request);
        }
    }
}