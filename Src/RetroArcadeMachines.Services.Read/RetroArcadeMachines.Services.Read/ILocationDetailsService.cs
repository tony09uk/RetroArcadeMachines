using RetroArcadeMachines.Services.Read.Models;
using System;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Services.Read
{
    public interface ILocationDetailsService
    {
        Task<LocationDetailsDto> Get(Guid locationOverviewId);
    }
}