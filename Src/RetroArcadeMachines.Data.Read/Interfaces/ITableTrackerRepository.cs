using System.Globalization;

namespace RetroArcadeMachines.Data.Read.Interfaces
{
    public interface ITableTrackerRepository
    {
        CultureInfo DateStorageCulture { get; }
    }
}