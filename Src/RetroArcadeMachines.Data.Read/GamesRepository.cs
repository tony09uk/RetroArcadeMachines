using RetroArcadeMachines.Data.Read.Interfaces;
using RetroArcadeMachines.Shared.Models;

namespace RetroArcadeMachines.Data.Read
{
    public class GamesRepository : BaseRepository<GameModel>
    {
        public const string TableName = "Games";

        public GamesRepository(IProviderReadRepository<GameModel> readRepository) : base(readRepository)
        {
        }
    }
}
