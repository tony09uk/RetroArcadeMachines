using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
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

namespace RetroArcadeMachines.AzureFunctions.Read
{
    public class LocationOverviewHttpTriggerFunction
    {
        private readonly ILocationOverviewService _locationsOverviewService;
        private readonly ITableTrackerService _tableTrackerService;

        public LocationOverviewHttpTriggerFunction(
            ILocationOverviewService locationOverviewService,
            ITableTrackerService tableTrackerService)
        {
            _locationsOverviewService = Guard.Against.Null(locationOverviewService, nameof(locationOverviewService), nameof(ILocationOverviewService));
            _tableTrackerService = Guard.Against.Null(tableTrackerService, nameof(tableTrackerService), nameof(ITableTrackerService));
        }

        [FunctionName("LocationsOverview")]
        [OpenApiOperation(operationId: "Run", tags: new[] { "name" })]
        [OpenApiSecurity("function_key", SecuritySchemeType.ApiKey, Name = "code", In = OpenApiSecurityLocationType.Query)]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "text/plain", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("LocationsOverview: process started");

            DateTime? passedLastModifiedDate = req.Headers.GetIfModifiedSince();
            log.LogInformation("LocationsOverview: lastModifiedDate provided: {lastModifiedDate}", passedLastModifiedDate);

            DateTime? savedLastModifiedDate = await _tableTrackerService.GetLastDateModified(typeof(LocationOverviewDto));
            
            if(_tableTrackerService.HasTableBeenModified(passedLastModifiedDate, savedLastModifiedDate))
            {
                IEnumerable<LocationOverviewDto> result = await _locationsOverviewService.Get();
                return new OkLastModifiedResult(result, req.HttpContext.Response, savedLastModifiedDate);
            }
            return new NotModifiedResult();
        }
    }
}

