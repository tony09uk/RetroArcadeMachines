using RetroArcadeMachines.Data.Read.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Read.Interfaces
{
    public interface IDevelopersRepository
    {
        Task Add(DeveloperModel roadmapItem);
        Task AddMany(List<DeveloperModel> roadmapItems);
        Task Delete(string id);
        Task<IEnumerable<DeveloperModel>> Get();
        Task<DeveloperModel> Get(string id);
        Task Update(DeveloperModel roadmapItem);
    }
}