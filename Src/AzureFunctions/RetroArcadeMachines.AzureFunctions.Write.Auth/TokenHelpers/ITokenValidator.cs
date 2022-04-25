using RetroArcadeMachines.AzureFunctions.Write.Auth.Models;
using System.Threading.Tasks;

namespace RetroArcadeMachines.AzureFunctions.Write.Auth.TokenHelpers
{
    public interface ITokenValidator
    {
        Task<SocialTokenValidationResult> TryValidateToken(string token, params string[] fields);
    }
}