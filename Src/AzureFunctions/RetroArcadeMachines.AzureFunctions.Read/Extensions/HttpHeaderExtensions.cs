using Microsoft.AspNetCore.Http;
using System;
using System.Globalization;

namespace RetroArcadeMachines.AzureFunctions.Read.Extensions
{
    public static class HttpHeaderExtensions
    {
        public static DateTime? GetIfModifiedSince(this IHeaderDictionary headers)
        {
            return GetIfModifiedSince(headers, "s", CultureInfo.InvariantCulture);
        }

        public static DateTime? GetIfModifiedSince(this IHeaderDictionary headers, string format, CultureInfo culture)
        {
            string modifiedDate = headers["if-modified-since"];
            if (string.IsNullOrWhiteSpace(modifiedDate))
            {
                return null;
            }

            var isValidDate = DateTime.TryParse(modifiedDate, out DateTime validDate);
            //var isValidDate = DateTime.TryParseExact(modifiedDate, format, culture, DateTimeStyles.None, out DateTime validDate);

            if (!isValidDate)
            {
                return null;
            }

            return validDate;
        }
    }
}
