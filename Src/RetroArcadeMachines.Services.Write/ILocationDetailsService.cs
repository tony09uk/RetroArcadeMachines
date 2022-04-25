using System.Threading.Tasks;
using RetroArcadeMachines.Services.Write.Models;

namespace RetroArcadeMachines.Services.Write
{
    public interface ILocationDetailsService
    {
        Task<WriteRequestResult> Add(LocationDetailsDto locationDetails, string username);
    }
}
