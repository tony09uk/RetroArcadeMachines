using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Enums;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using RetroArcadeMachines.Shared.Models;
using RetroArcadeMachines.Services.Write;
using System;
using System.Net;
using System.Threading.Tasks;
using RetroArcadeMachines.Shared.Models.Validation.Models;
using RetroArcadeMachines.Shared.Models.Validation.Extensions;
using RetroArcadeMachines.Shared.Models.Validation;

namespace RetroArcadeMachines.AzureFunctions.Write
{
    public class ContactHttpTriggerFunction
    {
        private ICloudQueue<ContactFormRequestModel> _cloudQueue;

        public ContactHttpTriggerFunction(ICloudQueue<ContactFormRequestModel> cloudQueue)
        {
            _cloudQueue = cloudQueue;
        }

        [FunctionName("Contact")]
        [OpenApiOperation(operationId: "Run", tags: new[] { "name" })]
        [OpenApiSecurity("function_key", SecuritySchemeType.ApiKey, Name = "code", In = OpenApiSecurityLocationType.Query)]
        [OpenApiParameter(name: "name", In = ParameterLocation.Query, Required = true, Type = typeof(string), Description = "The **Name** parameter")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "text/plain", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log,
            ExecutionContext context)
        {
            log.LogInformation($"C# Http trigger function executed at: {DateTime.Now}");

            ValidatableRequestModel<ContactFormRequestModel> form = await req.GetJsonBody<ContactFormRequestModel, ContactFormRequestModelValidator>();

            if(!form.IsValid)
            {
                log.LogInformation($"Invalid form data.");
                return form.ToBadRequest();
            }

            await _cloudQueue.Add(form.Value, context.FunctionAppDirectory);

            return new OkObjectResult($"{nameof(ContactHttpTriggerFunction)} executed successfully!!");
        }
    }
}
