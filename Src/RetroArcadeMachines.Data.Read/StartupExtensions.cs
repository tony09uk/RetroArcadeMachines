using Amazon;
using Amazon.DynamoDBv2;
using Amazon.Extensions.NETCore.Setup;
using Amazon.Runtime;
using Amazon.Runtime.CredentialManagement;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RetroArcadeMachines.Data.Read.AWS;

namespace RetroArcadeMachines.Data.Read
{
    public static class StartupExtensions
    {
        public static IServiceCollection AddRetroArcadeMachinesDataRead(this IServiceCollection services, IConfigurationRoot configuration)
        {
            var awsOptions = GetAWSOptions(configuration);

            services.AddDefaultAWSOptions(awsOptions);

            services.AddAWSService<IAmazonDynamoDB>();
            services.AddSingleton<IRoadmapRepository, DynamoDbRoadmapRepository>();

            return services;
        }

        private static AWSOptions GetAWSOptions(IConfigurationRoot configuration)
        {
            var awsOptions = configuration.GetAWSOptions();

#if DEBUG
            var netSDKFile = new NetSDKCredentialsFile();

            //uncomment and run the below code if you do not have a local profile created
            //var profile = new CredentialProfile("basic_profile", new CredentialProfileOptions
            //{
            //    AccessKey = [add you access key here],
            //    SecretKey = [add your secret key here]
            //});
            //profile.Region = RegionEndpoint.EUWest2;
            //netSDKFile.RegisterProfile(profile);

            var isProfileExists = netSDKFile.TryGetProfile("basic_profile", out var credentialProfile);
            if (isProfileExists)
            {
                awsOptions.Credentials =
                    new BasicAWSCredentials(credentialProfile.Options.AccessKey, credentialProfile.Options.SecretKey);
            }
#else
            var accessKey = configuration.GetValue<string>("AWS:AccessKey");
            var secretKey = configuration.GetValue<string>("AWS:SecretKey");
            awsOptions.Credentials = new BasicAWSCredentials(accessKey, secretKey);
            awsOptions.Region = RegionEndpoint.EUWest2;
#endif

            return awsOptions;
        }
    }
}
