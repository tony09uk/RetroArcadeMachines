using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Threading.Tasks;

namespace RetroArcadeMachines.AzureFunctions.Read
{
    public static class SendGridEmailQueueTriggerFunction
    {
        [FunctionName("SendGridEmailQueueTriggerFunction")]
        public static async Task Run(
            [QueueTrigger("email-queue", Connection = "CloudStorageAccount")] string myQueueItem,
            ILogger log)
        {
            log.LogInformation($"C# Queue trigger function processed: {myQueueItem}");

            try
            {
                var apiKey = Environment.GetEnvironmentVariable("SendgridAPIKey");
                var client = new SendGridClient(apiKey);
                var from = new EmailAddress("tony09uk@gmail.com", "Retro Arcade Machines");
                var subject = "Query from retro arcade machines";
                var to = new EmailAddress("tony09uk@gmail.com", "Retro Arcade Machines");
                var plainTextContent = "plainTextContent";
                var htmlContent = myQueueItem.ToString();
                var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                var response = await client.SendEmailAsync(msg);
            }
            catch (Exception ex)
            {
                log.LogError($"Error occured while processing QueueItem {myQueueItem} , Exception - {ex.InnerException}");
            }
        }
    }
}

