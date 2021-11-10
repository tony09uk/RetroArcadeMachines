using System;
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
using RetroArcadeMachines.Services.Read;

namespace RetroArcadeMachines.AzureFunctions.Read
{
    public class LocationDetailsHttpTriggerFunction
    {
        private readonly ILocationDetailsService _locationDetailsService;

        public LocationDetailsHttpTriggerFunction(ILocationDetailsService locationDetailsService)
        {
            _locationDetailsService = locationDetailsService;
        }

        [FunctionName("LocationDetails")]
        [OpenApiOperation(operationId: "Run", tags: new[] { "name" })]
        [OpenApiSecurity("function_key", SecuritySchemeType.ApiKey, Name = "code", In = OpenApiSecurityLocationType.Query)]
        [OpenApiParameter(name: "id", In = ParameterLocation.Query, Required = true, Type = typeof(Guid), Description = "The **id** parameter")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "text/plain", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var isParamGuid = Guid.TryParse(req.Query["id"], out var locationOverviewId);
            if(!isParamGuid)
            {
                return new BadRequestObjectResult("the parameter **id** must be a valid Guid");
            }

            var responseMessage = await _locationDetailsService.Get(locationOverviewId);

            return new OkObjectResult(responseMessage);
        }
    }
}
