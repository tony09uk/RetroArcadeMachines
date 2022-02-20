using RetroArcadeMachines.Data.Read.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Read
{
    public abstract class BaseRepository<T> : IReadRepository<T>
    {
        private readonly IProviderReadRepository<T> _readRepository;

        protected BaseRepository(IProviderReadRepository<T> readRepository)
        {
            _readRepository = readRepository;
        }

        public Task<IEnumerable<T>> Get()
        {
            return _readRepository.Get();
        }

        public Task<T> Get(Guid id)
        {
            return _readRepository.Get(id);
        }

        public Task<T> Get(string id)
        {
            return _readRepository.Get(id);
        }

        public Task<List<T>> Get(IEnumerable<Guid> uniqueIds)
        {
            return _readRepository.Get(uniqueIds);
        }
    }
}
