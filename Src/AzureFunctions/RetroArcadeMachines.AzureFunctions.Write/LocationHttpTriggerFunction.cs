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
using RetroArcadeMachines.Shared.Models.Validation;
using RetroArcadeMachines.Shared.Models.Validation.Models;
using RetroArcadeMachines.Shared.Models.Validation.Extensions;
using RetroArcadeMachines.Services.Write;
using RetroArcadeMachines.Shared.Models.Requests;
using AutoMapper;
using Ardalis.GuardClauses;
using RetroArcadeMachines.Services.Write.Models;
using System;

namespace RetroArcadeMachines.AzureFunctions.Write
{
    public class LocationHttpTriggerFunction
    {
        private readonly IMapper _mapper;
        private readonly ILocationDetailsService _locationDetailsService;

        public LocationHttpTriggerFunction(IMapper mapper, ILocationDetailsService locationDetailsService)
        {
            _mapper = Guard.Against.Null(mapper, nameof(mapper), nameof(IMapper));
            _locationDetailsService = Guard.Against.Null(locationDetailsService, nameof(locationDetailsService), nameof(ILocationDetailsService));
        }

        [FunctionName("AddLocation")]
        [OpenApiOperation(operationId: "Run", tags: new[] { "name" })]
        [OpenApiSecurity("function_key", SecuritySchemeType.ApiKey, Name = "code", In = OpenApiSecurityLocationType.Query)]
        [OpenApiParameter(name: "name", In = ParameterLocation.Query, Required = true, Type = typeof(string), Description = "The **Name** parameter")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "text/plain", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            try
            {
                // todo: check if user is logged in!
                ValidatableRequestModel<LocationDetailsRequestModel> addLocationRequest = await req.GetJsonBody<LocationDetailsRequestModel, LocationDetailsRequestModelValidator>();

                if (!addLocationRequest.IsValid)
                {
                    return addLocationRequest.ToBadRequest();
                }

                var locationDetailsDto = _mapper.Map<LocationDetailsDto>(addLocationRequest.Value);
                locationDetailsDto.Town = addLocationRequest.Value.Address.Town;

                bool isUpdated = await _locationDetailsService.Add(_mapper.Map<LocationDetailsDto>(locationDetailsDto));

                return new OkObjectResult(isUpdated);
            } catch (Exception ex)
            {
                log.LogError($"AddLocation had an unexpexpected error {ex.Message}");
                return new BadRequestResult() { };
            }
        }
    }
}

