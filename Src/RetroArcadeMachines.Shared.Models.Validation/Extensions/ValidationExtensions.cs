using Microsoft.AspNetCore.Mvc;
using RetroArcadeMachines.Shared.Models.Validation.Models;
using System.Linq;

namespace RetroArcadeMachines.Shared.Models.Validation.Extensions
{
    public static class ValidationExtensions
    {
        /// <summary>
        /// Creates a <see cref="BadRequestObjectResult"/> containing a collection
        /// of minimal validation error details.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static BadRequestObjectResult ToBadRequest<T>(this ValidatableRequestModel<T> request)
        {
            return new BadRequestObjectResult(request.Errors.Select(e => new {
                Field = e.PropertyName,
                Error = e.ErrorMessage
            }));
        }
    }
}
