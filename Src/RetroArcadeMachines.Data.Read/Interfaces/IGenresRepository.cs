using RetroArcadeMachines.Data.Read.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Read.Interfaces
{
    public interface IGenresRepository
    {
        Task Add(GenreModel roadmapItem);
        Task AddMany(List<GenreModel> roadmapItems);
        Task Delete(string id);
        Task<IEnumerable<GenreModel>> Get();
        Task<GenreModel> Get(string id);
        Task Update(GenreModel roadmapItem);
    }
}