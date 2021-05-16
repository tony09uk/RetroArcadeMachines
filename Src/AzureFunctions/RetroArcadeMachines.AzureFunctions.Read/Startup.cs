using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RetroArcadeMachines.Data.Read;
using RetroArcadeMachines.Services.Read;
using System.IO;

[assembly: FunctionsStartup(typeof(RetroArcadeMachines.AzureFunctions.Read.Startup))]
namespace RetroArcadeMachines.AzureFunctions.Read
{
    //https://docs.microsoft.com/en-us/azure/azure-functions/functions-dotnet-dependency-injection
    public class Startup : FunctionsStartup
    {
        private IConfigurationRoot _configuration;

        public Startup()
        {
            _configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
        }

        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddHttpClient();

            builder.Services.AddScoped<IRoadmapService, RoadmapService>();
            builder.Services.AddRetroArcadeMachinesDataRead(_configuration);
            builder.Services.AddAutoMapper(typeof(Startup), typeof(MappingConfiguration));
        }

        //public override void ConfigureAppConfiguration(IFunctionsConfigurationBuilder builder)
        //{
        //    builder.ConfigurationBuilder
        //        .AddJsonFile(Path.Combine(context.ApplicationRootPath, "appsettings.json"), optional: true, reloadOnChange: false)
        //        .AddJsonFile(Path.Combine(context.ApplicationRootPath, $"appsettings.{context.EnvironmentName}.json"), optional: true, reloadOnChange: false)
        //        .AddEnvironmentVariables();
        //    base.ConfigureAppConfiguration(builder);
        //}
    }
}
