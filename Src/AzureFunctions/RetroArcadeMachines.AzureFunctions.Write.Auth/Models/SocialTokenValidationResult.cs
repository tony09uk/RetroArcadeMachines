using System.Collections.Generic;

namespace RetroArcadeMachines.AzureFunctions.Write.Auth.Models
{
    public class SocialTokenValidationResult
    {
        public bool IsValid { get; set; }
        public string InvalidResultMessage { get; set; }
        public Dictionary<string, string> FieldValues { get; set; }
    }
}
