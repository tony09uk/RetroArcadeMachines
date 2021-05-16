using Amazon.DynamoDBv2;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    class Initialiser : IInitialiser
    {
        private readonly IAmazonDynamoDB _dynamoDBClient;
        private readonly IEnumerable<ITableInitialiser> _tableInitialisers;

        public Initialiser(
            IEnumerable<ITableInitialiser> tableInitialisers,
            IAmazonDynamoDB dynamoDBClient)
        {
            _tableInitialisers = tableInitialisers;
            _dynamoDBClient = dynamoDBClient;
        }

        public async Task Run()
        {
            try
            {
                var tableList = await _dynamoDBClient.ListTablesAsync();

                foreach (var tableInitialiser in _tableInitialisers)
                {
                    if (IsTableCreationRequired(tableList.TableNames, tableInitialiser.TableName()))
                    {
                        await tableInitialiser.Create(_dynamoDBClient);
                        tableInitialiser.Seed();
                    }
                    else
                    {
                        Console.WriteLine($"{tableInitialiser.TableName()} already exists");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Creating table: {ex}");

                throw ex;
            }
        }

        private bool IsTableCreationRequired(List<string> tableNameList, string tableName)
        {
            if(tableNameList.Contains(tableName))
            {
                return false;
            }

            return true;
        }
    }
}
