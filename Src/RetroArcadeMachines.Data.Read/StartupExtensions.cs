using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.Extensions.NETCore.Setup;
using Amazon.Runtime;
using Amazon.Runtime.CredentialManagement;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RetroArcadeMachines.Data.Read.AWS;
using System;
using System.Configuration;

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

            services.AddSingleton<IRoadmapRepository, DynamoDbRoadmapRepository>();

            return services;
        }

        private static AWSOptions GetAWSOptions(IConfiguration configuration)
        {
            var accessKey = Environment.GetEnvironmentVariable("AWS:AccessKey");
            var secretKey = Environment.GetEnvironmentVariable("AWS:SecretKey");

            var awsOptions = configuration.GetAWSOptions();

            awsOptions.Credentials = new BasicAWSCredentials(accessKey, secretKey);
            awsOptions.Region = RegionEndpoint.EUWest2;

            return awsOptions;
        }
    }
}
