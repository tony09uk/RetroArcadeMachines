using RetroArcadeMachines.Services.Read.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Services.Read
{
    public interface IRoadmapService
    {
        Task<IEnumerable<RoadmapItemDto>> Get();
    }
}