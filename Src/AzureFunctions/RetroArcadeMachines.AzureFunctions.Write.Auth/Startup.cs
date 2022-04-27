using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Polly;
using Polly.Extensions.Http;
using RetroArcadeMachines.AzureFunctions.Write.Auth.TokenHelpers;
using RetroArcadeMachines.Services.Write;
using System;
using System.Net.Http;


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

            builder.Services.AddHttpClient<ITokenValidator, FacebookTokenValidator>(client =>
            {
                client.BaseAddress = new Uri("https://graph.facebook.com");
                client.DefaultRequestHeaders.Add("ContentType", "application/json");
                
            }).AddPolicyHandler(GetRetryPolicy());

            builder.Services.AddApplicationInsightsTelemetry();
        }

        private IAsyncPolicy<HttpResponseMessage> GetRetryPolicy()
        {
            return HttpPolicyExtensions
                .HandleTransientHttpError()
                .OrResult(msg => msg.StatusCode == System.Net.HttpStatusCode.NotFound)
                .WaitAndRetryAsync(4, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));
        }
    }
}
