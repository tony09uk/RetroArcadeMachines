using RetroArcadeMachines.Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RetroArcadeMachines.Services.Read
{
    public class CachingHelperService : ICachingHelperService
    {
        public bool TryGetCacheableTypeName(Type cacheableType, out string name)
        {
            Type cacheableModel = typeof(ICacheableModel);
            List<Type> types = AppDomain.CurrentDomain
                                        .GetAssemblies()
                                        .SelectMany(s => s.GetTypes())
                                        .Where(p => cacheableModel.IsAssignableFrom(p))
                                        .ToList();

            var cacheableTypeName = cacheableType.Name
                                        .Replace("Dto", string.Empty)
                                        .Replace("Model", string.Empty);

            IEnumerable<Type> cacheableModelType = types.Where(x => x.Name.Contains(cacheableTypeName));
            Type outputType = cacheableModelType?.FirstOrDefault(x => x.Name.Contains("Model"));

            if (cacheableModelType == null || outputType == null)
            {
                name = string.Empty;
                return false;
            }

            name = outputType.Name;
            return true;
        }
    }
}
