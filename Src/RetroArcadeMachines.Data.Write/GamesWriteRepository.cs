using RetroArcadeMachines.Data.Write.Interfaces;
using RetroArcadeMachines.Shared.Models;

namespace RetroArcadeMachines.Data.Write
{
    public class GamesWriteRepository : BaseWriteRepository<GameModel>
    {
        public const string TableName = "Games";

        public GamesWriteRepository(IProviderWriteRepository<GameModel> providerWriteRepository) : base(providerWriteRepository)
        {
        }
    }
}
