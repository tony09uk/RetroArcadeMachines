using RetroArcadeMachines.Data.Read.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Read.Interfaces
{
    public interface IRoadmapRepository
    {
        Task<IEnumerable<RoadmapItemModel>> Get();
        Task Add(RoadmapItemModel roadmapItem);
        Task<RoadmapItemModel> Get(string id);
        Task Update(RoadmapItemModel roadmapItem);
        Task AddMany(List<RoadmapItemModel> roadmapItems);
        Task Delete(string id);
    }
}