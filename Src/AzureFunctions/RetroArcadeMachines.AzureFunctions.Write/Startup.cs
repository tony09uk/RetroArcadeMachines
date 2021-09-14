using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using RetroArcadeMachines.Services.Write;

[assembly: FunctionsStartup(typeof(RetroArcadeMachines.AzureFunctions.Write.Startup))]
namespace RetroArcadeMachines.AzureFunctions.Write
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddRetroArcadeMachinesServiceWrite();
        }
    }
}
