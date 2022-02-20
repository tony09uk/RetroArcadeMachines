using RetroArcadeMachines.Services.Read.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Services.Read
{
    public interface IGamesService
    {
        Task<IEnumerable<GameOverviewDto>> Get();
        Task<IEnumerable<GameOverviewDto>> Get(IEnumerable<Guid> ids);
    }
}