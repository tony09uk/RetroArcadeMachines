using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RetroArcadeMachines.Data.Write;
using RetroArcadeMachines.Shared.Models.Requests;

namespace RetroArcadeMachines.Services.Write
{
    public static class StartupExtensions
    {
        public static IServiceCollection AddRetroArcadeMachinesServiceWrite(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<ICloudQueue<ContactFormRequestModel>, AzureCloudQueue>();
            services.AddScoped<ILocationDetailsService, LocationDetailsService>();
            services.AddLogging();

            services.AddRetroArcadeMachinesDataWrite(configuration);

            return services;
        }
    }
}
