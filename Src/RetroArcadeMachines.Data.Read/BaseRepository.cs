using RetroArcadeMachines.Data.Read.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ardalis.GuardClauses;

namespace RetroArcadeMachines.Data.Read
{
    public abstract class BaseRepository<T> : IReadRepository<T>
    {
        private readonly IProviderReadRepository<T> _readRepository;

        protected BaseRepository(IProviderReadRepository<T> readRepository)
        {
            _readRepository = Guard.Against.Null(readRepository, nameof(readRepository), nameof(IProviderReadRepository<T>));
        }

        public virtual Task<IEnumerable<T>> Get()
        {
            return _readRepository.Get();
        }

        public virtual Task<T> Get(Guid id)
        {
            return _readRepository.Get(id);
        }

        public virtual Task<T> Get(string id)
        {
            return _readRepository.Get(id);
        }

        public virtual Task<List<T>> Get(IEnumerable<Guid> uniqueIds)
        {
            return _readRepository.Get(uniqueIds);
        }
    }
}
