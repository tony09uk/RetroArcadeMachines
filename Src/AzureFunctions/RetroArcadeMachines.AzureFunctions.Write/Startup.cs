using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RetroArcadeMachines.Services.Write;

[assembly: FunctionsStartup(typeof(RetroArcadeMachines.AzureFunctions.Write.Startup))]
namespace RetroArcadeMachines.AzureFunctions.Write
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {

            //builder.Services.AddScoped<ILocationDetailsService, LocationDetailsService>();

            IConfiguration configuration = builder.GetContext().Configuration;
            builder.Services.AddRetroArcadeMachinesServiceWrite(configuration);

            builder.Services.AddAutoMapper(typeof(Startup), typeof(MappingConfiguration));
            // todo: move this to StartupExtensions
            builder.Services.AddAutoMapper(typeof(Startup), typeof(Services.Write.MappingConfiguration));
        }
    }
}
