using System;

namespace RetroArcadeMachines.Services.Read
{
    public interface ICachingHelperService
    {
        bool TryGetCacheableTypeName(Type cacheableType, out string name);
    }
}