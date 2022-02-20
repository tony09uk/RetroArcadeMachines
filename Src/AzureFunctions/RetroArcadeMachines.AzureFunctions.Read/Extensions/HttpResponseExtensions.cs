using Microsoft.AspNetCore.Http;
using System;

namespace RetroArcadeMachines.AzureFunctions.Read.Extensions
{
    public static class HttpResponseExtensions
    { 
        public static void AddLastModifiedHeader(this HttpResponse response, DateTime? lastModified)
        {
            if(lastModified != null) {
                response.Headers.Add("last-modified", lastModified.ToString());
            }
        }
    }
}
