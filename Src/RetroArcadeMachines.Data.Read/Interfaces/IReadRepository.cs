using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Read.Interfaces
{
    public interface IReadRepository<T>
    {
        Task<IEnumerable<T>> Get();
        Task<T> Get(Guid id);
        Task<T> Get(string id);
        Task<List<T>> Get(IDictionary<string, string> ids);
    }
}