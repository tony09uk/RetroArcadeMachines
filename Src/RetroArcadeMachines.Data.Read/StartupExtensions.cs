using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.Extensions.NETCore.Setup;
using Amazon.Runtime;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RetroArcadeMachines.Shared.Models;
using RetroArcadeMachines.Data.Read.AWS;
using RetroArcadeMachines.Data.Read.Interfaces;
using System;
using RetroArcadeMachines.Data.Read.Azure;
using RetroArcadeMachines.Data.Read.GCP;

namespace RetroArcadeMachines.Data.Read
{
    public static class StartupExtensions
    {
        public static IServiceCollection AddRetroArcadeMachinesDataRead(this IServiceCollection services, IConfiguration configuration)
        {
            AddDbProvider(services, configuration);

            services.AddSingleton<IReadRepository<RoadmapItemModel>, RoadmapRepository>();
            services.AddSingleton<IReadRepository<GameModel>, GamesRepository>();
            services.AddSingleton<IReadRepository<DeveloperModel>, DevelopersRepository>();
            services.AddSingleton<IReadRepository<GenreModel>, GenreRepository>();
            services.AddSingleton<IReadRepository<LocationOverviewModel>, LocationOverviewRepository>();
            services.AddSingleton<IReadRepository<LocationDetailsModel>, LocationDetailsRepository>();
            services.AddSingleton<IReadRepository<TableTrackerModel>, TableTrackerRepository>();

            return services;
        }

        private static void AddDbProvider(IServiceCollection services, IConfiguration configuration)
        {
            var dbProvider = Environment.GetEnvironmentVariable("DbProvider");
            if(dbProvider == null)
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
            services.AddSingleton<IProviderReadRepository<RoadmapItemModel>, CosmosDbBaseRepository<RoadmapItemModel>>();
            services.AddSingleton<IProviderReadRepository<GameModel>, CosmosDbBaseRepository<GameModel>>();
            services.AddSingleton<IProviderReadRepository<DeveloperModel>, CosmosDbBaseRepository<DeveloperModel>>();
            services.AddSingleton<IProviderReadRepository<GenreModel>, CosmosDbBaseRepository<GenreModel>>();
            services.AddSingleton<IProviderReadRepository<LocationOverviewModel>, CosmosDbBaseRepository<LocationOverviewModel>>();
            services.AddSingleton<IProviderReadRepository<LocationDetailsModel>, CosmosDbBaseRepository<LocationDetailsModel>>();
            services.AddSingleton<IProviderReadRepository<TableTrackerModel>, CosmosDbBaseRepository<TableTrackerModel>>();

            return services;
        }

        private static IServiceCollection AddCloudFireStoreDbProvider(IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IProviderReadRepository<RoadmapItemModel>, CloudFireStoreDbBaseRepository<RoadmapItemModel>>();
            services.AddSingleton<IProviderReadRepository<GameModel>, CloudFireStoreDbBaseRepository<GameModel>>();
            services.AddSingleton<IProviderReadRepository<DeveloperModel>, CloudFireStoreDbBaseRepository<DeveloperModel>>();
            services.AddSingleton<IProviderReadRepository<GenreModel>, CloudFireStoreDbBaseRepository<GenreModel>>();
            services.AddSingleton<IProviderReadRepository<LocationOverviewModel>, CloudFireStoreDbBaseRepository<LocationOverviewModel>>();
            services.AddSingleton<IProviderReadRepository<LocationDetailsModel>, CloudFireStoreDbBaseRepository<LocationDetailsModel>>();
            services.AddSingleton<IProviderReadRepository<TableTrackerModel>, CloudFireStoreDbBaseRepository<TableTrackerModel>>();

            return services;
        }

        private static IServiceCollection AddDynamoDbProvider(IServiceCollection services, IConfiguration configuration)
        {
            var awsOptions = GetAWSOptions(configuration);

            services.AddDefaultAWSOptions(awsOptions);
            services.AddAWSService<IAmazonDynamoDB>();
            services.AddTransient<IDynamoDBContext, DynamoDBContext>();

            services.AddSingleton<IProviderReadRepository<RoadmapItemModel>, DynamoDbBaseRepository<RoadmapItemModel>>();
            services.AddSingleton<IProviderReadRepository<GameModel>, DynamoDbBaseRepository<GameModel>>();
            services.AddSingleton<IProviderReadRepository<DeveloperModel>, DynamoDbBaseRepository<DeveloperModel>>();
            services.AddSingleton<IProviderReadRepository<GenreModel>, DynamoDbBaseRepository<GenreModel>>();
            services.AddSingleton<IProviderReadRepository<LocationOverviewModel>, DynamoDbBaseRepository<LocationOverviewModel>>();
            services.AddSingleton<IProviderReadRepository<LocationDetailsModel>, DynamoDbBaseRepository<LocationDetailsModel>>();
            services.AddSingleton<IProviderReadRepository<TableTrackerModel>, DynamoDbBaseRepository<TableTrackerModel>>();

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
