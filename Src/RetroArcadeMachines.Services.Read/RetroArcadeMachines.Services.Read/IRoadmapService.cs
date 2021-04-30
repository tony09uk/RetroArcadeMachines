using RetroArcadeMachines.Services.Read.ViewModels;
using System.Collections.Generic;

namespace RetroArcadeMachines.Services.Read
{
    public interface IRoadmapService
    {
        IEnumerable<RoadmapItemDto>Get();
    }
}