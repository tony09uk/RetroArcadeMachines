using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.Model;
using Amazon.Runtime;
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
            UpdateTableTracker();
            Task task = _context.SaveAsync(item);
            return task;
        }

        public async Task<bool> AddMany(List<T> items)
        {
            _ = UpdateTableTracker();
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
            UpdateTableTracker();
            var task = _context.DeleteAsync<T>(id);
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
            var instance = Activator.CreateInstance(typeof(T));
            var tracker = new TableTrackerModel { 
                                DateTime = DateTime.UtcNow.ToString(
                                                TableTrackerRepository.DATE_STORAGE_FORMAT,
                                                TableTrackerRepository.DateStorageCulture),
                                Name = instance.GetType().Name
                            };
            return _context.SaveAsync(tracker);
        }
    }
}