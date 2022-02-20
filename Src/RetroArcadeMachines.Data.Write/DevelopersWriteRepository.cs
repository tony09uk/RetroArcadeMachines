using RetroArcadeMachines.Data.Write.Interfaces;
using RetroArcadeMachines.Shared.Models;

namespace RetroArcadeMachines.Data.Write
{
    public class DevelopersWriteRepository : BaseWriteRepository<DeveloperModel>
    {
        public const string TableName = "Developers";

        public DevelopersWriteRepository(IProviderWriteRepository<DeveloperModel> providerWriteRepository) : base(providerWriteRepository)
        {
        }
    }
}
