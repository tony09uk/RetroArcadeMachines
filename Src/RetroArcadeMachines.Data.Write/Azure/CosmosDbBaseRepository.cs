using RetroArcadeMachines.Data.Write.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Write.Azure
{
    class CosmosDbBaseRepository<T> : IProviderWriteRepository<T>
    {
        private const string NIE_MESSAGE = "CosmosDbBaseRepository has not been implemented. It is acting as a placeholder for anyone who wants to implement this layer in CosmosDb";

        public Task Add(T item)
        {
            throw new NotImplementedException(NIE_MESSAGE);
        }

        public Task<bool> AddMany(List<T> items)
        {
            throw new NotImplementedException(NIE_MESSAGE);
        }

        public Task Delete(string id)
        {
            throw new NotImplementedException(NIE_MESSAGE);
        }

        public Task Update(T item)
        {
            throw new NotImplementedException(NIE_MESSAGE);
        }
    }
}
