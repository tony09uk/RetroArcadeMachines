using Ardalis.GuardClauses;
using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.Queue;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RetroArcadeMachines.Shared.Models.Requests;
using System;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Services.Write
{
    public class AzureCloudQueue : ICloudQueue<ContactFormRequestModel>
    {
        private readonly ILogger<AzureCloudQueue> _logger;
        private const string QUEUE_NAME = "email-queue";

        public AzureCloudQueue(ILogger<AzureCloudQueue> logger)
        {
            _logger = Guard.Against.Null(logger, nameof(logger), nameof(AzureCloudQueue));
        }

        public async Task Add(ContactFormRequestModel item, string directoryPath)
        {
            CreateQueueIfNotExists(directoryPath);

            var serializeJsonObject = JsonConvert.SerializeObject(item);

            _logger.LogInformation($"{nameof(AzureCloudQueue)}: directoryPath - {directoryPath} and passed item: {serializeJsonObject}");

            CloudStorageAccount storageAccount = GetCloudStorageAccount(directoryPath);
            CloudQueueClient cloudQueueClient = storageAccount.CreateCloudQueueClient();
            CloudQueue cloudQueue = cloudQueueClient.GetQueueReference(QUEUE_NAME);
            var cloudQueueMessage = new CloudQueueMessage(serializeJsonObject, false);

            await cloudQueue.AddMessageAsync(cloudQueueMessage);
        }

        private void CreateQueueIfNotExists(string directoryPath)
        {
            CloudStorageAccount storageAccount = GetCloudStorageAccount(directoryPath);
            CloudQueueClient cloudQueueClient = storageAccount.CreateCloudQueueClient();
            string[] queues = new string[] { QUEUE_NAME };
            foreach (var item in queues)
            {
                CloudQueue cloudQueue = cloudQueueClient.GetQueueReference(item);
                cloudQueue.CreateIfNotExistsAsync();
            }
        }

        private CloudStorageAccount GetCloudStorageAccount(string directoryPath)
        {
            //var config = new ConfigurationBuilder().SetBasePath(directoryPath)
            //                                       .AddJsonFile("local.settings.json", true, true)
            //                                       .AddEnvironmentVariables()
            //                                       .Build();

            var cloudStorageAccount = Environment.GetEnvironmentVariable("CloudStorageAccount");

            //CloudStorageAccount storageAccount = CloudStorageAccount.Parse(config["CloudStorageAccount"]);
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(cloudStorageAccount);
            return storageAccount;
        }
    }
}
