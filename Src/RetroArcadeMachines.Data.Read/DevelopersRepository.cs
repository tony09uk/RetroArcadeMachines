using RetroArcadeMachines.Data.Read.Interfaces;
using RetroArcadeMachines.Shared.Models;

namespace RetroArcadeMachines.Data.Read
{
    public class DevelopersRepository : BaseRepository<DeveloperModel>
    {
        public const string TableName = "Developers";

        public DevelopersRepository(IProviderReadRepository<DeveloperModel> readRepository) : base(readRepository)
        {
        }
    }
}
