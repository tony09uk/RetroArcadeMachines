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

        public TableTrackerService(
            IReadRepository<TableTrackerModel> readRepository,
            ILogger<TableTrackerService> log)
        {
            _tableTrackerRepository = Guard.Against.Null(readRepository, nameof(readRepository), nameof(IReadRepository<TableTrackerModel>));
            _log = Guard.Against.Null(log, nameof(log), nameof(ILogger));
        }

        public async Task<bool> HasTableBeenModifiedSince(DateTime? date, Type modelType)
        { 
            if(!date.HasValue)
            {
                return true;
            }

            DateTime lastModified = date ?? default(DateTime);

            try
            {
                TableTrackerModel tableTrackerModel = await _tableTrackerRepository.Get(ConvertTypeToTableId(modelType));
                var isDate = DateTime.TryParse(tableTrackerModel.DateTime, out var tableModifiedDate);
                _log.LogInformation("HasTableBeenModifiedSince: recieved date: {date}. Table tracker value was {tableModifiedDate}", date.ToString(), tableModifiedDate.ToString());

                if(isDate)
                {
                    return tableModifiedDate > lastModified;
                }
                return true;
            } 
            catch(Exception ex)
            {
                _log.LogError(ex, "Error occurred while trying to get last modifed date of name: {modelType}.", ex.Message);
                return true;
            }
        }

        private string ConvertTypeToTableId(Type modelType)
        {
            var modelName = modelType.ToString();
            if(modelName.Contains("Dto"))
            {
                return modelName.Replace("Dto", "Model");
            }
            else
            {
                _log.LogWarning("TableTracker service expects the convention of Model name ending in Dto to be passed, but recieved {modelName}", new string[] { modelName });
            }
            return "";
        }
    }
}
