namespace RetroArcadeMachines.Shared.Models.Validation
{
    public partial class ContactFormRequestModelValidator
    {
        public static class ValidationMessageHelper
        {
            public static string ForNotEmpty(string propertyName)
            {
                return $"'{propertyName}' must not be empty";
            }

            public static string ForMinimumLength(string propertyName, int length)
            {
                return $"'{propertyName}' must have a minimum of {length} charater(s)";
            }

            public static string ForMaximumLength(string propertyName, int length)
            {
                return $"'{propertyName}' must have a maximum of {length} charaters";
            }

            public static string ForMatches(string propertyName, string pattern)
            {
                return $"'{propertyName}' must match the following pattern: {pattern}";
            }
        }
    }
}
