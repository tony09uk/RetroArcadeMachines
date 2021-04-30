using RetroArcadeMachines.Data.Read.Models;
using System.Collections.Generic;

namespace RetroArcadeMachines.Data.Read
{
    public interface IRoadmapRepository
    {
        IEnumerable<RoadmapItemModel> Get();
    }
}