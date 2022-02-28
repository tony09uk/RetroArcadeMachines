using System;
using System.Globalization;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Services.Read
{
    public interface ITableTrackerService
    {
        string DateStorageFormat { get; }
        CultureInfo DateStorageCulture { get; }
        Task<DateTime?> GetLastDateModified(Type type);
        bool HasTableBeenModified(DateTime? passedDate, DateTime? storedDate);
    }
}