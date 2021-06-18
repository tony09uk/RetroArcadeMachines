using RetroArcadeMachines.Data.Read.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Read.Interfaces
{
    public interface IGamesRepository
    {
        Task Add(GameModel roadmapItem);
        Task AddMany(List<GameModel> roadmapItems);
        Task Delete(string id);
        Task<IEnumerable<GameModel>> Get();
        Task<GameModel> Get(string id);
        Task Update(GameModel roadmapItem);
    }
}