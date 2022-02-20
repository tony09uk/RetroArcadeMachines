using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RetroArcadeMachines.Services.Read;
using System;

[assembly: FunctionsStartup(typeof(RetroArcadeMachines.AzureFunctions.Read.Startup))]
namespace RetroArcadeMachines.AzureFunctions.Read
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            IConfiguration configuration = builder.GetContext().Configuration;

            builder.Services.AddRetroArcadeMachinesServiceRead(configuration);
            builder.Services.AddAutoMapper(typeof(Startup), typeof(MappingConfiguration));
        }
    }
}
