namespace RetroArcadeMachines.AWS.DynamoDB.Generator.Extensions
{
    internal static class StringExtensions
    {
        public static int? ToNullableInt(this string s)
        {
            int i;
            if (int.TryParse(s, out i)) return i;
            return null;
        }
    }
}
