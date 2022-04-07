using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.Extensions.NETCore.Setup;
using Amazon.Runtime;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RetroArcadeMachines.Data.Read;
using RetroArcadeMachines.Data.Read.Interfaces;
using RetroArcadeMachines.Data.Write.AWS;
using RetroArcadeMachines.Data.Write.Azure;
using RetroArcadeMachines.Data.Write.GCP;
using RetroArcadeMachines.Data.Write.Interfaces;
using RetroArcadeMachines.Shared.Models;
using System;

namespace RetroArcadeMachines.Data.Write
{
    public static class StartupExtensions
    {
        public static IServiceCollection AddRetroArcadeMachinesDataWrite(this IServiceCollection services, IConfiguration configuration)
        {
            AddDbProvider(services, configuration);

            services.AddRetroArcadeMachinesDataRead(configuration);

            //services.AddSingleton<IReadRepository<LocationDetailsModel>, LocationDetailsRepository>();
            //services.AddSingleton<IReadRepository<GameModel>, GamesRepository>();

            services.AddSingleton<IWriteRepository<RoadmapItemModel>, RoadmapWriteRepository>();
            services.AddSingleton<IWriteRepository<GameModel>, GamesWriteRepository>();
            services.AddSingleton<IWriteRepository<DeveloperModel>, DevelopersWriteRepository>();
            services.AddSingleton<IWriteRepository<GenreModel>, GenreWriteRepository>();
            services.AddSingleton<IWriteRepository<LocationDetailsModel>, LocationDetailsWriteRepository>();
            services.AddSingleton<IWriteRepository<LocationOverviewModel>, LocationOverviewWriteRepository>();

            return services;
        }

        private static void AddDbProvider(IServiceCollection services, IConfiguration configuration)
        {
            var dbProvider = Environment.GetEnvironmentVariable("DbProvider");
            dbProvider = dbProvider == null ? configuration.GetValue<string>("Values:DbProvider") : dbProvider;
            if (dbProvider == null)
            {
                throw new NullReferenceException("dbProvider has not been found in configuration");
            }

            switch (dbProvider)
            {
                case "dynamoDb":
                    AddDynamoDbProvider(services, configuration);
                    break;
                case "cosmosDb":
                    AddCosmosDbProvider(services, configuration);
                    break;
                case "cloudfirestoreDb":
                    AddCloudFireStoreDbProvider(services, configuration);
                    break;
                default:
                    throw new NotImplementedException($"The following db: {dbProvider}, has not been implemented. Accepted values: dynamoDb, cosmosDb, cloudfirestoreDb");
            }
        }

        private static IServiceCollection AddCosmosDbProvider(IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IProviderWriteRepository<RoadmapItemModel>, CosmosDbBaseRepository<RoadmapItemModel>>();
            services.AddSingleton<IProviderWriteRepository<GameModel>, CosmosDbBaseRepository<GameModel>>();
            services.AddSingleton<IProviderWriteRepository<DeveloperModel>, CosmosDbBaseRepository<DeveloperModel>>();
            services.AddSingleton<IProviderWriteRepository<GenreModel>, CosmosDbBaseRepository<GenreModel>>();
            services.AddSingleton<IProviderWriteRepository<LocationDetailsModel>, CosmosDbBaseRepository<LocationDetailsModel>>();
            services.AddSingleton<IProviderWriteRepository<LocationOverviewModel>, CosmosDbBaseRepository<LocationOverviewModel>>();

            return services;
        }

        private static IServiceCollection AddCloudFireStoreDbProvider(IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IProviderWriteRepository<RoadmapItemModel>, CloudFireStoreDbBaseRepository<RoadmapItemModel>>();
            services.AddSingleton<IProviderWriteRepository<GameModel>, CloudFireStoreDbBaseRepository<GameModel>>();
            services.AddSingleton<IProviderWriteRepository<DeveloperModel>, CloudFireStoreDbBaseRepository<DeveloperModel>>();
            services.AddSingleton<IProviderWriteRepository<GenreModel>, CloudFireStoreDbBaseRepository<GenreModel>>();
            services.AddSingleton<IProviderWriteRepository<LocationDetailsModel>, CloudFireStoreDbBaseRepository<LocationDetailsModel>>();
            services.AddSingleton<IProviderWriteRepository<LocationOverviewModel>, CloudFireStoreDbBaseRepository<LocationOverviewModel>>();

            return services;
        }

        private static IServiceCollection AddDynamoDbProvider(IServiceCollection services, IConfiguration configuration)
        {
            var awsOptions = GetAWSOptions(configuration);
            services.AddDefaultAWSOptions(awsOptions);

            services.AddAWSService<IAmazonDynamoDB>();
            services.AddTransient<IDynamoDBContext, DynamoDBContext>();

            services.AddSingleton<IProviderWriteRepository<RoadmapItemModel>, DynamoDbBaseRepository<RoadmapItemModel>>();
            services.AddSingleton<IProviderWriteRepository<GameModel>, DynamoDbBaseRepository<GameModel>>();
            services.AddSingleton<IProviderWriteRepository<DeveloperModel>, DynamoDbBaseRepository<DeveloperModel>>();
            services.AddSingleton<IProviderWriteRepository<GenreModel>, DynamoDbBaseRepository<GenreModel>>();
            services.AddSingleton<IProviderWriteRepository<LocationDetailsModel>, DynamoDbBaseRepository<LocationDetailsModel>>();
            services.AddSingleton<IProviderWriteRepository<LocationOverviewModel>, DynamoDbBaseRepository<LocationOverviewModel>>();

            return services;
        }

        private static AWSOptions GetAWSOptions(IConfiguration configuration)
        {
            var accessKey = Environment.GetEnvironmentVariable("AWS:AccessKey");
            var secretKey = Environment.GetEnvironmentVariable("AWS:SecretKey");

            if (accessKey == null || secretKey == null)
            {
                throw new NullReferenceException("AWS:AccessKey or AWS:SecretKey EnvironmentVariables are null. Both are required");
            }

            var awsOptions = configuration.GetAWSOptions();

            awsOptions.Credentials = new BasicAWSCredentials(accessKey, secretKey);
            awsOptions.Region = RegionEndpoint.EUWest2;

            return awsOptions;
        }
    }
}
