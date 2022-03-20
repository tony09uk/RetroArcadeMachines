using Ardalis.GuardClauses;
using Microsoft.Extensions.Logging;
using RetroArcadeMachines.Data.Read;
using RetroArcadeMachines.Data.Read.Interfaces;
using RetroArcadeMachines.Shared.Models;
using System;
using System.Globalization;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Services.Read
{
    public class TableTrackerService : ITableTrackerService
    {
        public string DateStorageFormat => TableTrackerRepository.DATE_STORAGE_FORMAT;
        public CultureInfo DateStorageCulture => CultureInfo.InvariantCulture; //_tableTrackerRepository.DateStorageCulture;

        private readonly IReadRepository<TableTrackerModel> _tableTrackerRepository;
        private readonly ILogger _log;
        private readonly ICachingHelperService _cachingHelperService;

        public TableTrackerService(
            ICachingHelperService cachingHelperService,
            IReadRepository<TableTrackerModel> readRepository,
            ILogger<TableTrackerService> log)
        {
            _cachingHelperService = Guard.Against.Null(cachingHelperService, nameof(cachingHelperService), nameof(ICachingHelperService));
            _tableTrackerRepository = Guard.Against.Null(readRepository, nameof(readRepository), nameof(IReadRepository<TableTrackerModel>));
            _log = Guard.Against.Null(log, nameof(log), nameof(ILogger));
        }

        public async Task<DateTime?> GetLastDateModified(Type modelType)
        {
            if(modelType == null)
            {
                throw new ArgumentNullException("modelType parameter cannot be null");
            }
            try
            {
                bool isCacheable = _cachingHelperService.TryGetCacheableTypeName(modelType, out string modelName);
                if(!isCacheable)
                {
                    return null;
                }

                TableTrackerModel tableTrackerModel = await _tableTrackerRepository.Get(modelName);
                var isDate = DateTime.TryParse(tableTrackerModel?.DateTime, out var date);

                _log.LogInformation("HasTableBeenModifiedSince:  Table tracker value was {tableModifiedDate}", date.ToString());

                if (isDate && date != default(DateTime))
                {
                    return date;
                }
                return null;
            }
            catch (Exception ex)
            {
                _log.LogError(ex, "Error occurred while trying to get last modifed date of name: {modelType}.", ex.Message);
                return null;
            }
        }

        public bool HasTableBeenModified(DateTime? passedDate, DateTime? storedDate)
        {
            if(passedDate == null || storedDate == null)
            {
                return true;
            }
            return passedDate < storedDate;
        }
    }
}
