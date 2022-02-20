using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace RetroArcadeMachines.Auth
{
    public static class StartupExtensions
    {
        public static IServiceCollection AddRetroArcadeMachinesServiceRead(this IServiceCollection services, IConfiguration configuration)
        {
            
            return services;
        }
    }
}
