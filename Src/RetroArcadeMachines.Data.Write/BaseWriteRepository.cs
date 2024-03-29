﻿using Ardalis.GuardClauses;
using RetroArcadeMachines.Data.Write.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Write
{
    public class BaseWriteRepository<T> : IWriteRepository<T>
    {
        private readonly IProviderWriteRepository<T> _providerWriteRepository;

        public BaseWriteRepository(IProviderWriteRepository<T> providerWriteRepository)
        {
            _providerWriteRepository = Guard.Against.Null(providerWriteRepository, nameof(providerWriteRepository), nameof(IProviderWriteRepository<T>));
        }

        public Task Add(T item)
        {
            return _providerWriteRepository.Add(item);
        }

        public Task<bool> AddMany(List<T> items, int saveInChunksOf = 1000)
        {
            return _providerWriteRepository.AddMany(items, saveInChunksOf);
        }

        public Task Delete(string id)
        {
            return _providerWriteRepository.Delete(id);
        }

        public Task Update(T item)
        {
            return _providerWriteRepository.Update(item);
        }
    }
}
