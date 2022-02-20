using RetroArcadeMachines.Data.Read.Interfaces;
using RetroArcadeMachines.Shared.Models;

namespace RetroArcadeMachines.Data.Read
{
    public class GenreRepository : BaseRepository<GenreModel>
    {
        public const string TableName = "Genre";

        public GenreRepository(IProviderReadRepository<GenreModel> readRepository) : base(readRepository)
        {
        }
    }
}
