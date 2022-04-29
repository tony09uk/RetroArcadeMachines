using Ardalis.GuardClauses;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RetroArcadeMachines.AzureFunctions.Write.Auth.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace RetroArcadeMachines.AzureFunctions.Write.Auth.TokenHelpers
{
    public class FacebookTokenValidator : ITokenValidator
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger _logger;

        public FacebookTokenValidator(HttpClient httpClient, ILogger<FacebookTokenValidator> logger)
        {
            _httpClient = Guard.Against.Null(httpClient, nameof(httpClient), nameof(HttpClient));
            _logger = Guard.Against.Null(logger, nameof(logger), nameof(ILogger<FacebookTokenValidator>));
        }

        public async Task<SocialTokenValidationResult> TryValidateToken(string token, params string[] fields)
        {
            if(token == null)
            {
                return CreateResponse("Token was not provided");
            }

            token = token.Replace("Bearer ", string.Empty);

            try
            {
                string uri = CreateUri(token, fields);

                var responseMessage = await _httpClient.GetAsync(uri).ConfigureAwait(false);
                var contents = await responseMessage.Content.ReadAsStringAsync();

                var facebookErrorResponseMessage = JsonConvert.DeserializeObject<FacebookErrorResponseMessage>(contents);

                if(facebookErrorResponseMessage.Error != null)
                {
                    return CreateResponse($"{facebookErrorResponseMessage.Error.Message}");
                }

                var result = JsonConvert.DeserializeObject<Dictionary<string, string>>(contents);

                return CreateResponse(result);
            }
            catch(HttpRequestException ex)
            {
                _logger.LogError($"{nameof(FacebookTokenValidator)} threw an {nameof(HttpRequestException)} and was handled with returing failed response: {ex.Message}");
                return CreateResponse("Token was not provided");
            }
            catch(ArgumentNullException ex)
            {
                _logger.LogError($"{nameof(FacebookTokenValidator)} threw an {nameof(ArgumentNullException)}: {ex.Message}");
                throw;
            }
            catch(Exception ex)
            {
                _logger.LogError($"{nameof(FacebookTokenValidator)} threw an unexpected {nameof(Exception)}: {ex.Message}");
                throw;
            }
        }

        private string CreateUri(string token, params string[] fields)
        {
            string requestFields = string.Join(",", fields);
            string debugRequest = "";
//#if DEBUG
//            debugRequest = "&debug=all";
//#endif

            return $"/me?access_token={token}&fields={requestFields}{debugRequest}";
        }

        private SocialTokenValidationResult CreateResponse(Dictionary<string, string> fields)
        {
            return new SocialTokenValidationResult
            {
                IsValid = true,
                FieldValues = fields
            };
        }

        private SocialTokenValidationResult CreateResponse(string message)
        {
            return new SocialTokenValidationResult
            {
                IsValid = false,
                InvalidResultMessage = message,
            };
        }
    }
}
