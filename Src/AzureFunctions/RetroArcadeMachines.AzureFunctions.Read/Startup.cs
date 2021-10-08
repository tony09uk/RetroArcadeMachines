using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using RetroArcadeMachines.Data.Read;
using RetroArcadeMachines.Services.Read;

[assembly: FunctionsStartup(typeof(RetroArcadeMachines.AzureFunctions.Read.Startup))]
namespace RetroArcadeMachines.AzureFunctions.Read
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddHttpClient();

            builder.Services.AddScoped<IRoadmapService, RoadmapService>();
            builder.Services.AddScoped<IGamesService, GamesService>();
            builder.Services.AddScoped<ILocationOverviewService, LocationOverviewService>();
            builder.Services.AddScoped<ILocationDetailsService, LocationDetailsService>();

            var configuration = builder.GetContext().Configuration;
            builder.Services.AddRetroArcadeMachinesDataRead(configuration);
            builder.Services.AddAutoMapper(typeof(Startup), typeof(MappingConfiguration));
        }
    }
}
