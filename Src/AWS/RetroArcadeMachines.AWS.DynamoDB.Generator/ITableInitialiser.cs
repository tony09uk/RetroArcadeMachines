﻿using Amazon.DynamoDBv2;
using System.Threading.Tasks;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    interface ITableInitialiser
    {
        Task Create();
        Task<bool> Seed();
        string TableName();
    }
}