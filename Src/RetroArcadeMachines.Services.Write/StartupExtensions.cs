using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Polly;
using Polly.Extensions.Http;
using RetroArcadeMachines.Data.Write;
using RetroArcadeMachines.Shared.Models.Requests;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Security;

namespace RetroArcadeMachines.Services.Write
{
    public static class StartupExtensions
    {
        public static IServiceCollection AddRetroArcadeMachinesServiceWrite(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<ICloudQueue<ContactFormRequestModel>, AzureCloudQueue>();
            services.AddHttpClient<ILocationDetailsService, LocationDetailsService>(client =>
            {
                var writeBaseUrl = configuration.GetValue<string>("WriteBaseUrl");
                client.BaseAddress = new Uri(writeBaseUrl); // get url from config
                client.DefaultRequestHeaders.Add("ContentType", "application/json");
            })
            .ConfigurePrimaryHttpMessageHandler(() =>
                new HttpClientHandler() 
                { 
                    ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => {
                        var isDevelopment = false;
#if DEBUG
                        isDevelopment = true;
#endif
                        if (isDevelopment) return true;
                        return sslPolicyErrors == SslPolicyErrors.None;
                    }
                }
            )
            .AddPolicyHandler(GetRetryPolicy());
            
            services.AddLogging();

            services.AddRetroArcadeMachinesDataWrite(configuration);

            return services;
        }

        private static IAsyncPolicy<HttpResponseMessage> GetRetryPolicy()
        {
            return HttpPolicyExtensions
                .HandleTransientHttpError()
                .OrResult(msg => msg.StatusCode == System.Net.HttpStatusCode.NotFound)
                .WaitAndRetryAsync(4, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));
        }
    }
}
