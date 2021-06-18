using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using RetroArcadeMachines.Data.Read.AWS;
using RetroArcadeMachines.Data.Read.Interfaces;
using RetroArcadeMachines.Data.Read.Models;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    class DevelopersTableInitialiser : ITableInitialiser
    {
        private static string _tableName = DynamoDbGenreRepository.TableName;
        private readonly IGenresRepository _generesRepository;

        public DevelopersTableInitialiser(IGenresRepository generesRepository)
        {
            _generesRepository = generesRepository;
        }

        //TODO: update mapping to include genre
        //TODO: refactor all TableInitialisers to use the same base class
        //TODO: refactor all Repositories to use the same base class
        public async Task Create(IAmazonDynamoDB dynamoDBClient)
        {
            try
            {
                Console.WriteLine($"Creating table: {_tableName}");
                var request = new CreateTableRequest
                {
                    AttributeDefinitions = CreateAttributeDefiniationList(),
                    KeySchema = CreateKeySchemaList(),
                    ProvisionedThroughput = SetProvisionedThroughput(),
                    TableName = _tableName
                };

                var response = await dynamoDBClient.CreateTableAsync(request);
                WaitUntilTableIsReady(dynamoDBClient);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Seed()
        {
            _generesRepository.AddMany(SeedGenresTable.Data());
        }

        public string TableName()
        {
            return _tableName;
        }

        private List<AttributeDefinition> CreateAttributeDefiniationList()
        {
            return new List<AttributeDefinition>
            {
                new AttributeDefinition
                {
                    AttributeName = nameof(GenreModel.Id),
                    AttributeType = ScalarAttributeType.S
                },
                new AttributeDefinition
                {
                    AttributeName = nameof(GenreModel.Name),
                    AttributeType = ScalarAttributeType.N
                }
            };
        }

        private List<KeySchemaElement> CreateKeySchemaList()
        {
            return new List<KeySchemaElement>
            {
                new KeySchemaElement
                {
                    AttributeName = nameof(GenreModel.Id),
                    KeyType = KeyType.HASH
                },
                new KeySchemaElement
                {
                    AttributeName = nameof(GenreModel.Name),
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
                Thread.Sleep(5000);
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
    class GenresTableInitialiser : ITableInitialiser
    {
        private static string _tableName = DynamoDbGenreRepository.TableName;
        private readonly IGenresRepository _generesRepository;

        public GenresTableInitialiser(IGenresRepository generesRepository)
        {
            _generesRepository = generesRepository;
        }

        //TODO: update mapping to include genre
        //TODO: refactor all TableInitialisers to use the same base class
        //TODO: refactor all Repositories to use the same base class
        public async Task Create(IAmazonDynamoDB dynamoDBClient)
        {
            try
            {
                Console.WriteLine($"Creating table: {_tableName}");
                var request = new CreateTableRequest
                {
                    AttributeDefinitions = CreateAttributeDefiniationList(),
                    KeySchema = CreateKeySchemaList(),
                    ProvisionedThroughput = SetProvisionedThroughput(),
                    TableName = _tableName
                };

                var response = await dynamoDBClient.CreateTableAsync(request);
                WaitUntilTableIsReady(dynamoDBClient);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Seed()
        {
            _generesRepository.AddMany(SeedGenresTable.Data());
        }

        public string TableName()
        {
            return _tableName;
        }

        private List<AttributeDefinition> CreateAttributeDefiniationList()
        {
            return new List<AttributeDefinition>
            {
                new AttributeDefinition
                {
                    AttributeName = nameof(GenreModel.Id),
                    AttributeType = ScalarAttributeType.S
                },
                new AttributeDefinition
                {
                    AttributeName = nameof(GenreModel.Name),
                    AttributeType = ScalarAttributeType.N
                }
            };
        }

        private List<KeySchemaElement> CreateKeySchemaList()
        {
            return new List<KeySchemaElement>
            {
                new KeySchemaElement
                {
                    AttributeName = nameof(GenreModel.Id),
                    KeyType = KeyType.HASH
                },
                new KeySchemaElement
                {
                    AttributeName = nameof(GenreModel.Name),
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
                Thread.Sleep(5000);
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
