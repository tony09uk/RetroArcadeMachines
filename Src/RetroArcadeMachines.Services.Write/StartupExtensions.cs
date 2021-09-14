using Microsoft.Extensions.DependencyInjection;
using RetroArcadeMachines.Shared.Models;

namespace RetroArcadeMachines.Services.Write
{
    public static class StartupExtensions
    {
        public static IServiceCollection AddRetroArcadeMachinesServiceWrite(this IServiceCollection services)
        {
            services.AddScoped<ICloudQueue<ContactFormRequestModel>, AzureCloudQueue>();
            services.AddLogging();

            return services;
        }
    }
}
