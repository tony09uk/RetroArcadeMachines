using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Enums;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using RetroArcadeMachines.Services.Read;
using RetroArcadeMachines.Services.Read.Models;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace RetroArcadeMachines.AzureFunctions.Read
{
    public class GamesHttpTriggerFunction
    {
        private readonly IGamesService _gamesService;

        public GamesHttpTriggerFunction(IGamesService gamesService)
        {
            _gamesService = gamesService;
        }

        [FunctionName("Games")]
        [OpenApiOperation(operationId: "Run", tags: new[] { "name" })]
        [OpenApiSecurity("function_key", SecuritySchemeType.ApiKey, Name = "code", In = OpenApiSecurityLocationType.Query)]
        [OpenApiParameter(name: "name", In = ParameterLocation.Query, Required = true, Type = typeof(string), Description = "The **Name** parameter")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "text/plain", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            IEnumerable<GameOverviewDto> result = await _gamesService.Get();

            return new OkObjectResult(result);
        }
    }
}

