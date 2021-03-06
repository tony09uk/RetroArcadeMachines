using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    abstract class BaseTableInitialiser
    {
        private readonly IAmazonDynamoDB _dynamoDBClient;
        private string _tableName;
        public BaseTableInitialiser(
            IAmazonDynamoDB dynamoDBClient,
            string tableName)
        {
            _dynamoDBClient = dynamoDBClient;
            _tableName = tableName;
        }

        public string TableName()
        {
            return _tableName;
        }

        protected async Task Create(string identifier, string sortKey, string attributeName)
        {
            try
            {
                Console.WriteLine($"Creating table: {_tableName}");
                var request = new CreateTableRequest
                {
                    AttributeDefinitions = CreateAttributeDefiniationList(identifier, attributeName),
                    KeySchema = CreateKeySchemaList(identifier, sortKey),
                    ProvisionedThroughput = SetProvisionedThroughput(),
                    TableName = _tableName
                };

                var response = await _dynamoDBClient.CreateTableAsync(request);
                WaitUntilTableIsReady(_dynamoDBClient);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public abstract Task<bool> Seed();

        private List<AttributeDefinition> CreateAttributeDefiniationList(string identifier, string attributeName)
        {
            return new List<AttributeDefinition>
            {
                new AttributeDefinition
                {
                    AttributeName = identifier,
                    AttributeType = ScalarAttributeType.S
                },
                new AttributeDefinition
                {
                    AttributeName = attributeName,
                    AttributeType = ScalarAttributeType.N // todo: change this to read the taype passed in and map accordingly
                }
            };
        }

        /// <summary>
        /// Uses the partitionKey and sortKey to create a unique table identifier
        /// </summary>
        /// <param name="partitionKey"></param>
        /// <param name="sortKey"></param>
        /// <returns>List<KeySchemaElement></returns>
        private List<KeySchemaElement> CreateKeySchemaList(string partitionKey, string sortKey)
        {
            return new List<KeySchemaElement>
            {
                new KeySchemaElement
                {
                    AttributeName = partitionKey,
                    KeyType = KeyType.HASH
                },
                new KeySchemaElement
                {
                    AttributeName = sortKey,
                    KeyType = KeyType.RANGE //sort key
                }
            };
        }

        private ProvisionedThroughput SetProvisionedThroughput()
        {
            return new ProvisionedThroughput
            {
                ReadCapacityUnits = 3,
                WriteCapacityUnits = 1
            };
        }

        private bool WaitUntilTableIsReady(IAmazonDynamoDB dynamoDBClient)
        {
            string status = null;
            do
            {
                //Thread.Sleep(5000);
                try
                {
                    var res = dynamoDBClient.DescribeTableAsync(
                        new DescribeTableRequest
                        {
                            TableName = _tableName
                        });
                    status = res.Result.Table.TableStatus;
                }
                catch (Exception ex)
                {
                    throw;
                }
            } while (status != "ACTIVE");
            {
                Console.WriteLine("Table created!");
                return true;
            }
        }
    }
}
