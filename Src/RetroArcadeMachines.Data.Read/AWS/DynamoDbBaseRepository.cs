﻿using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using RetroArcadeMachines.Data.Read.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

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

            //todo: dynamodb could throw one of the below exceptions
                //catch (AmazonDynamoDBException e) { Console.WriteLine(e.Message); }
                //catch (AmazonServiceException e) { Console.WriteLine(e.Message); }
                //catch (Exception e) { Console.WriteLine(e.Message); }
            // create custom exceptions for the data layer to manage these
            // the custom exception will stop the services needing to know about the data provider(in this case AWS)
        }

        public Task<T> Get(Guid id)
        {
            return _context.LoadAsync<T>(id);
        }

        public Task<T> Get(string id)
        {
            return _context.LoadAsync<T>(id);
        }

        public async Task<List<T>> Get(IDictionary<string, string> uniqueIds)
        {
            var config = new DynamoDBOperationConfig();
            config.QueryFilter = new List<ScanCondition>
            {
                new ScanCondition("id", ScanOperator.Equal, uniqueIds)
            };

            var batchRead =  _context.CreateBatchGet<T>(config);
            
            foreach(var id in uniqueIds)
            {
                var hashKey = Guid.Parse(id.Key); // todo: move this into the games repo
                var sortKey = int.Parse(id.Value); // todo: move this into the games repo
                batchRead.AddKey(hashKey, sortKey);
            }

            await batchRead.ExecuteAsync();
            return batchRead.Results;
        }
    }
}
