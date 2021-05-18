using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RetroArcadeMachines.Data.Read;
using RetroArcadeMachines.Services.Read;
using System;
using System.Configuration;
using System.IO;

[assembly: FunctionsStartup(typeof(RetroArcadeMachines.AzureFunctions.Read.Startup))]
namespace RetroArcadeMachines.AzureFunctions.Read
{
    public class MyOptions
    {
        public string MyCustomSetting { get; set; }
    }

    //https://docs.microsoft.com/en-us/azure/azure-functions/functions-dotnet-dependency-injection
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddHttpClient();

            builder.Services.AddScoped<IRoadmapService, RoadmapService>();
            
            var configuration = builder.GetContext().Configuration;
            builder.Services.AddRetroArcadeMachinesDataRead(configuration);
            builder.Services.AddAutoMapper(typeof(Startup), typeof(MappingConfiguration));
        }
    }
}
