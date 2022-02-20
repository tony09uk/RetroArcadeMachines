using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RetroArcadeMachines.Services.Write;

[assembly: FunctionsStartup(typeof(RetroArcadeMachines.AzureFunctions.Write.Auth.Startup))]
namespace RetroArcadeMachines.AzureFunctions.Write.Auth
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            IConfiguration configuration = builder.GetContext().Configuration;

            builder.Services.AddRetroArcadeMachinesServiceWrite(configuration);

            builder.Services.AddAutoMapper(typeof(Startup), typeof(MappingConfiguration));

            builder.Services.AddAutoMapper(typeof(Startup), typeof(Services.Write.MappingConfiguration));
        }
    }
}
