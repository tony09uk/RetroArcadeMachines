using System.IO;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Enums;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using RetroArcadeMachines.Services.Read;

namespace RetroArcadeMachines.AzureFunctions.Read
{
    public class LocationOverviewHttpTriggerFunction
    {
        private readonly ILocationOverviewService _locationsOverviewService;

        public LocationOverviewHttpTriggerFunction(ILocationOverviewService locationsOverviewService)
        {
            _locationsOverviewService = locationsOverviewService;
        }

        [FunctionName("LocationsOverview")]
        [OpenApiOperation(operationId: "Run", tags: new[] { "name" })]
        [OpenApiSecurity("function_key", SecuritySchemeType.ApiKey, Name = "code", In = OpenApiSecurityLocationType.Query)]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "text/plain", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            //todo: call locationsOverview from swagger
            //todo: fix errors
            //todo: call locatiosnDetails from swagger
            //todo: fix errors
            //todo: resolve other todo's as found
            //todo: call both endpoints from UI
            var result = await _locationsOverviewService.Get();

            return new OkObjectResult(result);
        }
    }
}

