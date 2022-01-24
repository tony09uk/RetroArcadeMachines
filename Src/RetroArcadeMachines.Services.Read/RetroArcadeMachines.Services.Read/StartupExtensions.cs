using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RetroArcadeMachines.Data.Read;

namespace RetroArcadeMachines.Services.Read
{
    public static class StartupExtensions
    {
        public static IServiceCollection AddRetroArcadeMachinesServiceRead(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddHttpClient();

            services.AddScoped<IRoadmapService, RoadmapService>();
            services.AddScoped<IGamesService, GamesService>();
            services.AddScoped<ILocationOverviewService, LocationOverviewService>();
            services.AddScoped<ILocationDetailsService, LocationDetailsService>();

            services.AddRetroArcadeMachinesDataRead(configuration);

            return services;
        }
    }
}
