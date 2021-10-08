using RetroArcadeMachines.Services.Read.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Services.Read
{
    public interface ILocationOverviewService
    {
        Task<IEnumerable<LocationOverviewDto>> Get();
        Task<LocationOverviewDto> Get(int locationOverviewId);
    }
}