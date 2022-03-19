namespace RetroArcadeMachines.AzureFunctions.Read.Tests
{
    using RetroArcadeMachines.AzureFunctions.Read;
    using System;
    using Xunit;
    using Moq;
    using RetroArcadeMachines.Services.Read;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Logging;
    using System.Threading.Tasks;
    using System.Collections.Generic;
    using RetroArcadeMachines.Services.Read.Models;
    using System.Linq;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;

    public class RoadmapsHttpTriggerFunctionTests
    {
        private RoadmapsHttpTriggerFunction _testClass;
        private Mock<IRoadmapService> _roadmapServiceMock;

        public RoadmapsHttpTriggerFunctionTests()
        {
            _roadmapServiceMock = new Mock<IRoadmapService>();
            _testClass = new RoadmapsHttpTriggerFunction(_roadmapServiceMock.Object);
        }

        [Fact]
        public void CanConstruct()
        {
            var instance = new RoadmapsHttpTriggerFunction(_roadmapServiceMock.Object);
            Assert.NotNull(instance);
        }

        [Fact]
        public void CannotConstructWithNullRoadmapService()
        {
            Assert.Throws<ArgumentNullException>(() => new RoadmapsHttpTriggerFunction(default(IRoadmapService)));
        }

        [Fact]
        public async Task RunReturnsRoadmapItemDtoList()
        {
            var req = new Mock<HttpRequest>();
            var log = new Mock<ILogger>().Object;
            var expected = new List<RoadmapItemDto>
            {
                new RoadmapItemDto { Id = Guid.NewGuid() }
            };
            _roadmapServiceMock.Setup(x => x.Get()).Returns(Task.FromResult(expected.AsEnumerable()));

            IActionResult result = await _testClass.Run(req.Object, log);
            var resultObject = (OkObjectResult)result;

            Assert.Equal(expected, resultObject.Value);
        }

        [Fact]
        public async Task CannotCallRunWithNullLog()
        {
            var req = new Mock<HttpRequest>();

            await Assert.ThrowsAsync<ArgumentNullException>(() => _testClass.Run(req.Object, default(ILogger)));
        }
    }
}