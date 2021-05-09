using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace RetroArcadeMachines.Data.Read
{
    public static class Extensions
    {
        public static void AddRetroArcadeMachinesDataRead(this IFunctionsHostBuilder builder)
        {
            builder.Services.AddSingleton(new CosmosClient(Environment.GetEnvironmentVariable("EndpointUrl"), Environment.GetEnvironmentVariable("PrimaryKey")));
            builder.Services.AddSingleton<IRoadmapRepository, CosmosSqlDbRoadmapRepository>();
        }
    }
}
