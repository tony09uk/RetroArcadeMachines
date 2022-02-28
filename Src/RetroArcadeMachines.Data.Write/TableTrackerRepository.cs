using RetroArcadeMachines.Data.Write.Interfaces;
using RetroArcadeMachines.Shared.Models;
using System.Globalization;

namespace RetroArcadeMachines.Data.Write
{
    public class TableTrackerRepository : BaseWriteRepository<TableTrackerModel>
    {
        public const string TableName = "TableTracker";
        public const string DATE_STORAGE_FORMAT = "s";
        public static CultureInfo DateStorageCulture => CultureInfo.InvariantCulture;


        public TableTrackerRepository(IProviderWriteRepository<TableTrackerModel> providerWriteRepository) : base(providerWriteRepository)
        {
        }
    }
}
