using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Write.Interfaces
{
    public interface IWriteRepository<T>
    {
        Task Add(T roadmapItem);
        Task<bool> AddMany(List<T> roadmapItems);
        Task Delete(string id);
        Task Update(T roadmapItem);
    }
}
