using RetroArcadeMachines.Data.Read.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Read.GCP
{
    class CloudFireStoreDbBaseRepository<T> : IProviderReadRepository<T>
    {
        private const string NIE_MESSAGE = "CloudFireStoreDbBaseRepository has not been implemented. It is acting as a placeholder for anyone who wants to implement this layer in Cloud Fire Store";

        public Task<IEnumerable<T>> Get()
        {
            throw new NotImplementedException(NIE_MESSAGE);
        }

        public Task<T> Get(Guid id)
        {
            throw new NotImplementedException(NIE_MESSAGE);
        }

        public Task<T> Get(string id)
        {
            throw new NotImplementedException(NIE_MESSAGE);
        }

        public Task<List<T>> Get(IEnumerable<Guid> uniqueIds)
        {
            throw new NotImplementedException(NIE_MESSAGE);
        }
    }
}
