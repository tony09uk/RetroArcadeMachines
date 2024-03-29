﻿using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Data.Write.Interfaces
{
    public interface IWriteRepository<T>
    {
        Task Add(T item);
        Task<bool> AddMany(List<T> items, int saveInChunksOf = 1000);
        Task Delete(string id);
        Task Update(T item);
    }
}
