using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RetroArcadeMachines.AzureFunctions.Read.HttpResponseResults
{
    public class NotModifiedResult : ObjectResult
    {
        public NotModifiedResult(string message = null) : base(message)
        { 
            StatusCode = StatusCodes.Status304NotModified;
        }
    }
}
