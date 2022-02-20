using System;
using System.Globalization;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Services.Read
{
    public interface ITableTrackerService
    {
        string DateStorageFormat { get; }
        CultureInfo DateStorageCulture { get; }
        Task<bool> HasTableBeenModifiedSince(DateTime? date, Type type);
    }
}