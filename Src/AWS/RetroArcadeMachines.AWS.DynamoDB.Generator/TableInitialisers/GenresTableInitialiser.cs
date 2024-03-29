﻿using Amazon.DynamoDBv2;
using RetroArcadeMachines.Shared.Models;
using RetroArcadeMachines.Data.Write.AWS;
using RetroArcadeMachines.Data.Write.Interfaces;
using System.Threading.Tasks;
using RetroArcadeMachines.Data.Write;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    class GenresTableInitialiser : BaseTableInitialiser, ITableInitialiser
    {
        private readonly IWriteRepository<GenreModel> _generesRepository;
        private readonly ISeedTable<GenreModel> _seedTable;

        public GenresTableInitialiser(
            IAmazonDynamoDB dynamoDBClient,
            IWriteRepository<GenreModel> generesRepository,
            ISeedTable<GenreModel> seedTable) : base(dynamoDBClient, GenreWriteRepository.TableName)
        {
            _generesRepository = generesRepository;
            _seedTable = seedTable;
        }

        public async Task Create()
        {
            await base.Create(
                    nameof(GenreModel.Id),
                    typeof(GenreModel));
        }

        public override Task<bool> Seed()
        {
            return _generesRepository.AddMany(_seedTable.Data());
        }
    }
}
