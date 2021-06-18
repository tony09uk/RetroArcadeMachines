﻿using Amazon.DynamoDBv2;
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
    class GamesTableInitialiser : ITableInitialiser
    {
        private static string _tableName = DynamoDbGamesRepository.TableName;
        private readonly IGamesRepository _gamesRepository;
        private readonly ISeedTable<GameModel> _seedTable;

        public GamesTableInitialiser(
            IGamesRepository gamesRepository,
            ISeedTable<GameModel> seedTable)
        {
            _gamesRepository = gamesRepository;
            _seedTable = seedTable;
        }

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
            _gamesRepository.AddMany(_seedTable.Data());
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
                    AttributeName = nameof(GameModel.Id),
                    AttributeType = ScalarAttributeType.S
                },
                new AttributeDefinition
                {
                    AttributeName = nameof(GameModel.ReleaseYear),
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
                    AttributeName = nameof(GameModel.Id),
                    KeyType = KeyType.HASH
                },
                new KeySchemaElement
                {
                    AttributeName = nameof(GameModel.ReleaseYear),
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
