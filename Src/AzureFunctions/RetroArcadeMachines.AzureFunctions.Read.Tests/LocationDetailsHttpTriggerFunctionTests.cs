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
    using System.Collections.Specialized;
    using Microsoft.AspNetCore.Http.Internal;
    using System.Collections.Generic;
    using Microsoft.Extensions.Primitives;
    using Microsoft.AspNetCore.Mvc;
    using RetroArcadeMachines.Services.Read.Models;

    public class LocationDetailsHttpTriggerFunctionTests
    {
        private Mock<ILocationDetailsService> _locationsDetailsServiceMock;
        private Mock<ILogger> _loggerMock;
        private LocationDetailsHttpTriggerFunction _sut;

        public LocationDetailsHttpTriggerFunctionTests()
        {
            _loggerMock = new Mock<ILogger>();
            _locationsDetailsServiceMock = new Mock<ILocationDetailsService>();
            _sut = new LocationDetailsHttpTriggerFunction(_locationsDetailsServiceMock.Object);
        }

        [Fact]
        public async Task BadRequestObjectResultReturnsWhenGuidInvalid()
        {
            var req = new Mock<HttpRequest>();
            var queryString = new Dictionary<string, StringValues>()
            {
                { "id", "invalidGuid" }
            };
            req.Setup(x => x.Query).Returns(new QueryCollection(queryString));

            var expected = new BadRequestObjectResult("");
            var actual = await _sut.Run(req.Object, _loggerMock.Object);

            Assert.True(expected.GetType() == actual.GetType());
        }

        [Fact]
        public async Task NoContentResultReturnsWhenLocationDetailsNull()
        {
            var req = new Mock<HttpRequest>();
            var queryString = new Dictionary<string, StringValues>()
            {
                { "id", Guid.NewGuid().ToString() }
            };
            req.Setup(x => x.Query).Returns(new QueryCollection(queryString));
            _locationsDetailsServiceMock.Setup(x => x.Get(It.IsAny<Guid>())).Returns(Task.FromResult(default(LocationDetailsDto)));

            var actual = await _sut.Run(req.Object, _loggerMock.Object);

            var expected = new NoContentResult();
            Assert.True(expected.GetType() == actual.GetType());
        }

        [Fact]
        public async Task OkResultReturnsWhenLocationDetailsNotNull()
        {
            var req = new Mock<HttpRequest>();
            var queryString = new Dictionary<string, StringValues>()
            {
                { "id", Guid.NewGuid().ToString() }
            };
            req.Setup(x => x.Query).Returns(new QueryCollection(queryString));
            var locationDetails = new LocationDetailsDto { Id = Guid.NewGuid() };
            _locationsDetailsServiceMock.Setup(x => x.Get(It.IsAny<Guid>())).Returns(Task.FromResult(locationDetails));

            IActionResult actual = await _sut.Run(req.Object, _loggerMock.Object);

            var expected = new OkObjectResult(locationDetails);
            var actualResult = (OkObjectResult)actual;

            Assert.True(expected.GetType() == actual.GetType());
            Assert.Equal(expected.Value, actualResult.Value);
        }

        [Fact]
        public async Task CannotCallRunWithNullReq()
        {
            await Assert.ThrowsAsync<NullReferenceException>(() => _sut.Run(default(HttpRequest), new Mock<ILogger>().Object));
        }

        [Fact]
        public async Task CannotCallRunWithNullLog()
        {
            await Assert.ThrowsAsync<ArgumentNullException>(() => _sut.Run(new Mock<HttpRequest>().Object, default(ILogger)));
        }
    }
}