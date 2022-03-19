using RetroArcadeMachines.Data.Read.Interfaces;
using RetroArcadeMachines.Shared.Models;
using System.Globalization;

namespace RetroArcadeMachines.Data.Read
{
    public class TableTrackerRepository : BaseRepository<TableTrackerModel>
    {
        public const string TABLE_NAME = "TableTracker";
        public const string DATE_STORAGE_FORMAT = "s";
        public CultureInfo DateStorageCulture => CultureInfo.InvariantCulture;

        public TableTrackerRepository(IProviderReadRepository<TableTrackerModel> readRepository) : base(readRepository)
        {
        }
    }
}
