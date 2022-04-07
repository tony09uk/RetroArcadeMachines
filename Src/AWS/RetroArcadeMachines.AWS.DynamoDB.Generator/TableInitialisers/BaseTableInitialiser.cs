using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using RetroArcadeMachines.AWS.DynamoDB.Generator.CustomExceptions;
using System;
using System.Collections.Generic;
using System.Reflection;
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

        protected async Task Create(string identifier, Type model)
        {
            await Create(identifier, null, null, model);
        }

        protected async Task Create(string identifier, string sortKey, string attributeName, Type model)
        {
            try
            {
                Console.WriteLine($"Creating table: {_tableName}");
                var request = new CreateTableRequest
                {
                    AttributeDefinitions = CreateAttributeDefiniationList(identifier, attributeName, model),
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

        private List<AttributeDefinition> CreateAttributeDefiniationList(string identifier, string attributeName, Type model)
        {
            PropertyInfo identifierInfo = model.GetProperty(identifier);
            
            var attrListDef = new List<AttributeDefinition>
            {
                new AttributeDefinition
                {
                    AttributeName = identifierInfo.PropertyType == typeof(Guid) ? identifier.ToString() : identifier,
                    AttributeType = GetScalarAttributeType(identifierInfo)
                }
            };

            if(attributeName != null)
            {
                PropertyInfo attributeNameInfo = model.GetProperty(attributeName);

                var sortKey = new AttributeDefinition
                {
                    AttributeName = attributeName,
                    AttributeType = GetScalarAttributeType(attributeNameInfo)
                };
                attrListDef.Add(sortKey);
            }

            return attrListDef;
        }

        private ScalarAttributeType GetScalarAttributeType(PropertyInfo info)
        {
            if(info.PropertyType == typeof(string) || info.PropertyType == typeof(Guid))
            {
                return ScalarAttributeType.S;
            }
            if (info.PropertyType == typeof(int))
            {
                return ScalarAttributeType.N;
            }
            if (info.PropertyType == typeof(bool))
            {
                return ScalarAttributeType.B;
            }

            throw new CreateAttributeDefiniationException($"{info.Name} must be a type of string, Guid, int or bool. You have provided the type {info.PropertyType}");
        }

        /// <summary>
        /// Uses the partitionKey and sortKey to create a unique table identifier
        /// </summary>
        /// <param name="partitionKey"></param>
        /// <param name="sortKey"></param>
        /// <returns>List<KeySchemaElement></returns>
        private List<KeySchemaElement> CreateKeySchemaList(string partitionKey, string sortKey)
        {
            var elements = new List<KeySchemaElement>
            {
                new KeySchemaElement
                {
                    AttributeName = partitionKey,
                    KeyType = KeyType.HASH
                }
            };

            if(sortKey != null)
            {
                var sortElement = new KeySchemaElement
                {
                    AttributeName = sortKey,
                    KeyType = KeyType.RANGE //sort key
                };
                elements.Add(sortElement);
            }

            return elements;
        }

        private ProvisionedThroughput SetProvisionedThroughput()
        {
            return new ProvisionedThroughput
            {
                ReadCapacityUnits = 9,
                WriteCapacityUnits = 6
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
