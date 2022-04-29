using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Ardalis.GuardClauses;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Enums;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using Microsoft.OpenApi.Models;
using RetroArcadeMachines.AzureFunctions.Write.Auth.Models;
using RetroArcadeMachines.AzureFunctions.Write.Auth.TokenHelpers;
using RetroArcadeMachines.Services.Write;
using RetroArcadeMachines.Services.Write.Models;
using RetroArcadeMachines.Shared.Models.Requests;
using RetroArcadeMachines.Shared.Models.Validation;
using RetroArcadeMachines.Shared.Models.Validation.Extensions;
using RetroArcadeMachines.Shared.Models.Validation.Models;

namespace RetroArcadeMachines.AzureFunctions.Write.Auth
{
    public class LocationHttpTriggerFunction
    {
        private readonly IMapper _mapper;
        private readonly ILocationDetailsService _locationDetailsService;
        private readonly ITokenValidator _tokenValidator;

        public LocationHttpTriggerFunction(
            IMapper mapper,
            ILocationDetailsService locationDetailsService,
            ITokenValidator tokenValidator)
        {
            _mapper = Guard.Against.Null(mapper, nameof(mapper), nameof(IMapper));
            _locationDetailsService = Guard.Against.Null(locationDetailsService, nameof(locationDetailsService), nameof(ILocationDetailsService));
            _tokenValidator = Guard.Against.Null(tokenValidator, nameof(tokenValidator), nameof(ITokenValidator));
        }

        [FunctionName("AddLocation")]
        [OpenApiOperation(operationId: "Run", tags: new[] { "name" })]
        [OpenApiSecurity("function_key", SecuritySchemeType.ApiKey, Name = "code", In = OpenApiSecurityLocationType.Query)]
        [OpenApiParameter(name: "name", In = ParameterLocation.Query, Required = true, Type = typeof(string), Description = "The **Name** parameter")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "text/plain", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger logger)
        {
            try
            {
                ValidatableRequestModel <LocationDetailsRequestModel> addLocationRequest = await req.GetJsonBody<LocationDetailsRequestModel, LocationDetailsRequestModelValidator>();

                if (!addLocationRequest.IsValid)
                {
                    return addLocationRequest.ToBadRequest();
                }

                KeyValuePair<string, StringValues> token = req.Headers.FirstOrDefault(x => x.Key == "Authorization");
                var field = "email";
                SocialTokenValidationResult tokenValidationResult = await _tokenValidator.TryValidateToken(token.Value, field);

                if (!tokenValidationResult.IsValid)
                {
                    return new StatusCodeResult(StatusCodes.Status401Unauthorized);
                }

                var username = tokenValidationResult.FieldValues[field];

                WriteRequestResult result = await _locationDetailsService.Add(CreateLocationDto(addLocationRequest.Value), username);

                switch (result.Status)
                {
                    case WriteRequestStatus.Success:
                        return new CreatedResult(GetResourceLocation(result.ItemId, logger), new { Id = result.ItemId });
                    case WriteRequestStatus.Duplicate:
                        return new AcceptedResult(GetResourceLocation(result.ItemId, logger), new { Id = result.ItemId });
                    default:
                        return new StatusCodeResult(StatusCodes.Status500InternalServerError);
                }
            }
            catch (Exception ex)
            {
                logger.LogError($"AddLocation had an unexpexpected error: {ex.Message}");
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }

        private LocationDetailsDto CreateLocationDto(LocationDetailsRequestModel requestModel)
        {
            var locationDetailsDto = _mapper.Map<LocationDetailsDto>(requestModel);
            locationDetailsDto.Town = requestModel.Address.Town;
            locationDetailsDto.GameOverviewList = _mapper.Map<List<AssignedGamesDto>>(requestModel.AssignedGamesList);
            return _mapper.Map<LocationDetailsDto>(locationDetailsDto);
        }

        private string GetResourceLocation(Guid? id, ILogger log)
        {
            string readBaseUrl = Environment.GetEnvironmentVariable("ReadBaseUrl");
            if(string.IsNullOrEmpty(readBaseUrl))
            {
                log.LogError("ReadBaseUrl does not exist or has an empty config value");
                throw new Exception("Missing ReadBaseUrl config value");
            }
            readBaseUrl += $"LocationDetails/{id}";

            return readBaseUrl;
        }
    }
}

