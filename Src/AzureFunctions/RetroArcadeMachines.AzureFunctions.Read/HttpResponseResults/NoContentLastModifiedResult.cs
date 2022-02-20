using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RetroArcadeMachines.AzureFunctions.Read.Extensions;
using System;

namespace RetroArcadeMachines.AzureFunctions.Read.HttpResponseResults
{
    public class NoContentLastModifiedResult : NoContentResult
    {
        public NoContentLastModifiedResult(HttpResponse response, DateTime? lastModified) : base()
        {
            response.AddLastModifiedHeader(lastModified);
        }
    }
}
