namespace RetroArcadeMachines.AzureFunctions.Read.Tests
{
    using RetroArcadeMachines.AzureFunctions.Read;
    using System;
    using Xunit;
    using Microsoft.Extensions.Logging;
    using System.Threading.Tasks;

    public static class SendGridEmailQueueTriggerFunctionTests
    {
        [Fact]
        public static async Task CannotCallRunWithNullLog()
        {
            await Assert.ThrowsAsync<ArgumentNullException>(() => SendGridEmailQueueTriggerFunction.Run("TestValue870414907", default(ILogger)));
        }
    }
}