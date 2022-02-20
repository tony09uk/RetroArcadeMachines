using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RetroArcadeMachines.AzureFunctions.Read.Extensions;
using System;

namespace RetroArcadeMachines.AzureFunctions.Read.HttpResponseResults
{
    public class OkLastModifiedResult : OkObjectResult
    {
        public OkLastModifiedResult(object value, HttpResponse response, DateTime? lastModified) : base(value)
        {
            response.AddLastModifiedHeader(lastModified);
        }
    }
}
