using RetroArcadeMachines.Data.Read.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Read
{
    public interface IRoadmapRepository
    {
        Task<IEnumerable<RoadmapItemModel>> Get();
    }
}