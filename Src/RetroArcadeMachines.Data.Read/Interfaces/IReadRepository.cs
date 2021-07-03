using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Read.Interfaces
{
    public interface IReadRepository<T>
    {
        Task<IEnumerable<T>> Get();
        Task<T> Get(string id);
    }
}