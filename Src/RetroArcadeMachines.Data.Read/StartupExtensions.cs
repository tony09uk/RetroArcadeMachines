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

namespace RetroArcadeMachines.Data.Read
{
    public static class StartupExtensions
    {
        public static IServiceCollection AddRetroArcadeMachinesDataRead(this IServiceCollection services, IConfiguration configuration)
        {
            var awsOptions = GetAWSOptions(configuration);

            services.AddDefaultAWSOptions(awsOptions);
            services.AddAWSService<IAmazonDynamoDB>();
            services.AddTransient<IDynamoDBContext, DynamoDBContext>();

            services.AddSingleton<IReadRepository<RoadmapItemModel>, DynamoDbRoadmapRepository>();
            services.AddSingleton<IReadRepository<GameModel>, DynamoDbGamesRepository>();
            services.AddSingleton<IReadRepository<DeveloperModel>, DynamoDbDevelopersRepository>();
            services.AddSingleton<IReadRepository<GenreModel>, DynamoDbGenreRepository>();

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
