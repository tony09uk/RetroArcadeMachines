using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Data.Write.Extensions;
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

        public async Task<bool> AddMany(List<T> items, int saveInChunksOf = 1000)
        {
            if(items.Count > saveInChunksOf)
            {
                List<Task> saveRequest = new List<Task>();
                foreach(var chunk in items.ChunkBy(saveInChunksOf))
                {
                    saveRequest.Add(AddManyItems(chunk));
                }

                await Task.WhenAll(saveRequest);
                return true; // todo: this will not always be true interogate each result to check is failed
            }
            var result = await AddManyItems(items);

            return result;
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

        private async Task<bool> AddManyItems(List<T> items)
        {
            _ = UpdateTableTracker();
            BatchWrite<T> batch = _context.CreateBatchWrite<T>();
            batch.AddPutItems(items);
            await batch.ExecuteAsync();

            return true;
        }
    }
}