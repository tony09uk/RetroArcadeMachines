using Ardalis.GuardClauses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Enums;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using RetroArcadeMachines.AzureFunctions.Read.Extensions;
using RetroArcadeMachines.AzureFunctions.Read.HttpResponseResults;
using RetroArcadeMachines.Services.Read;
using RetroArcadeMachines.Services.Read.Models;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace RetroArcadeMachines.AzureFunctions.Read
{
    public class GamesHttpTriggerFunction
    {
        private readonly IGamesService _gamesService;
        private readonly ITableTrackerService _tableTrackerService;

        public GamesHttpTriggerFunction(
            IGamesService gamesService,
            ITableTrackerService tableTrackerService)
        {
            _gamesService = Guard.Against.Null(gamesService, nameof(gamesService), nameof(IGamesService));
            _tableTrackerService = Guard.Against.Null(tableTrackerService, nameof(tableTrackerService), nameof(ITableTrackerService));
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
            log.LogInformation("LocationsOverview: process started");

            DateTime? lastModifiedDate = req.Headers.GetIfModifiedSince();
            log.LogInformation("LocationsOverview: lastModifiedDate provided: {lastModifiedDate}", lastModifiedDate);

            bool shouldGetNewData = await _tableTrackerService.HasTableBeenModifiedSince(lastModifiedDate, typeof(GameOverviewDto));

            if (shouldGetNewData)
            {
                IEnumerable<GameOverviewDto> result = await _gamesService.Get();
                return new OkLastModifiedResult(result, req.HttpContext.Response, lastModifiedDate);
            }
            return new NoContentLastModifiedResult(req.HttpContext.Response, lastModifiedDate);
        }
    }
}

