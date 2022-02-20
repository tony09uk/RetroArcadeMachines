using RetroArcadeMachines.Data.Write.Interfaces;
using RetroArcadeMachines.Shared.Models;

namespace RetroArcadeMachines.Data.Write
{
    public class GenreWriteRepository : BaseWriteRepository<GenreModel>
    {
        public const string TableName = "Genre";

        public GenreWriteRepository(IProviderWriteRepository<GenreModel> providerWriteRepository) : base(providerWriteRepository)
        {
        }
    }
}
