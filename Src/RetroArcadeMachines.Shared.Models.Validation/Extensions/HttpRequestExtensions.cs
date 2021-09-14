using FluentValidation;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using RetroArcadeMachines.Shared.Models.Validation.Models;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Shared.Models.Validation.Extensions
{
    public static class HttpRequestExtensions
    {
        /// <summary>
        /// Returns the deserialized request body with validation information.
        /// </summary>
        /// <typeparam name="T">Type used for deserialization of the request body.</typeparam>
        /// <typeparam name="V">
        /// Validator used to validate the deserialized request body.
        /// </typeparam>
        /// <param name="request"></param>
        /// <returns></returns>
        public static async Task<ValidatableRequestModel<T>> GetJsonBody<T, V>(this HttpRequest request)
            where V : AbstractValidator<T>, new()
        {
            var requestObject = await request.GetJsonBody<T>();
            var validator = new V();
            var validationResult = validator.Validate(requestObject);

            if (!validationResult.IsValid)
            {
                return new ValidatableRequestModel<T>
                {
                    Value = requestObject,
                    IsValid = false,
                    Errors = validationResult.Errors
                };
            }

            return new ValidatableRequestModel<T>
            {
                Value = requestObject,
                IsValid = true
            };
        }

        /// <summary>
        /// Returns the deserialized request body.
        /// </summary>
        /// <typeparam name="T">Type used for deserialization of the request body.</typeparam>
        /// <param name="request"></param>
        /// <returns></returns>
        public static async Task<T> GetJsonBody<T>(this HttpRequest request)
        {
            var requestBody = await request.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<T>(requestBody);
        }

        private static async Task<string> ReadAsStringAsync(this HttpRequest request)
        {
            int defaultBufferSize = 1024;
            request.EnableBuffering();

            string result = null;
            using (var reader = new StreamReader(
                request.Body,
                encoding: Encoding.UTF8,
                detectEncodingFromByteOrderMarks: true,
                bufferSize: defaultBufferSize,
                leaveOpen: true))
            {
                result = await reader.ReadToEndAsync();
            }

            request.Body.Seek(0, SeekOrigin.Begin);

            return result;
        }
    }
}
