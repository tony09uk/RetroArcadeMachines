using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RetroArcadeMachines.Data.Write;
using RetroArcadeMachines.Shared.Models;
using System;
using System.Threading.Tasks;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    class Program
    {
        public static async Task Main(string[] args)
        {
            try
            {
                var serviceProvider = Configure();
                var initialiser = serviceProvider.GetService<IInitialiser>();
                await initialiser.Run();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        static ServiceProvider Configure()
        {
            var configuration = new ConfigurationBuilder()
                        .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                        .AddEnvironmentVariables()
                        .Build();

            return new ServiceCollection()
                    .AddRetroArcadeMachinesDataRead(configuration)
                    .RegisterAllTypes<ITableInitialiser>(new[] { typeof(Program).Assembly }, ServiceLifetime.Singleton)
                    .AddSingleton<ISeedTable<DeveloperModel>, SeedDevelopersTable>()
                    .AddSingleton<ISeedTable<GameModel>, SeedGamesTable>()
                    .AddSingleton<ISeedTable<GenreModel>, SeedGenresTable>()
                    .AddSingleton<ISeedTable<RoadmapItemModel>, SeedRoadmapsTable>()
                    .AddSingleton<ISeedTable<LocationDetailsModel>, SeedLocationDetailsTable>()
                    .AddSingleton<ISeedTable<LocationOverviewModel>, SeedLocationOverviewTable>()
                    .AddSingleton<IInitialiser, Initialiser>()
                    .BuildServiceProvider();
        }
    }
}
