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
    using RetroArcadeMachines.Services.Read.Models;
    using RetroArcadeMachines.AzureFunctions.Read.HttpResponseResults;
    using Newtonsoft.Json;
    using Microsoft.AspNetCore.Mvc;
    using System.Collections.Generic;
    using System.Linq;
    using System.Collections.Specialized;

    public class LocationOverviewHttpTriggerFunctionTests
    {
        private LocationOverviewHttpTriggerFunction _sut;
        private Mock<ILocationOverviewService> _locationOverviewService;
        private Mock<ITableTrackerService> _tableTrackerService;

        public LocationOverviewHttpTriggerFunctionTests()
        {
            _locationOverviewService = new Mock<ILocationOverviewService>();
            _tableTrackerService = new Mock<ITableTrackerService>();
            _sut = new LocationOverviewHttpTriggerFunction(_locationOverviewService.Object, _tableTrackerService.Object);
        }

        [Fact]
        public void CanConstruct()
        {
            var instance = new LocationOverviewHttpTriggerFunction(_locationOverviewService.Object, _tableTrackerService.Object);
            Assert.NotNull(instance);
        }

        [Fact]
        public void CannotConstructWithNullLocationOverviewService()
        {
            Assert.Throws<ArgumentNullException>(() => new LocationOverviewHttpTriggerFunction(default(ILocationOverviewService), new Mock<ITableTrackerService>().Object));
        }

        [Fact]
        public void CannotConstructWithNullTableTrackerService()
        {
            Assert.Throws<ArgumentNullException>(() => new LocationOverviewHttpTriggerFunction(new Mock<ILocationOverviewService>().Object, default(ITableTrackerService)));
        }

        [Fact]
        public async Task NotModifiedResultReturnedWithMatchingLastModifiedDate()
        {
            var req = new Mock<HttpRequest>();
            DateTime? dateTime = DateTime.Now;
            req.Setup(x => x.Headers.Add("if-modified-since", dateTime.HasValue.ToString()));
            var modifiedTableName = typeof(LocationOverviewDto);
            _tableTrackerService.Setup(x => x.GetLastDateModified(modifiedTableName)).Returns(Task.FromResult(dateTime));
            _tableTrackerService.Setup(x => x.HasTableBeenModified(dateTime, dateTime)).Returns(false);
            var log = new Mock<ILogger>().Object;
            var expected = new NotModifiedResult();

            var actual = await _sut.Run(req.Object, log);

            Assert.Equal(JsonConvert.SerializeObject(expected), JsonConvert.SerializeObject(actual));
        }

        [Fact]
        public async Task OkResultReturnedWithNotMatchingLastModifiedDate()
        {
            //arrange
            var fakeResult = new List<LocationOverviewDto>();
            var req = new Mock<HttpRequest>();
            var context = new Mock<HttpContext>();
            var httpResponse = new Mock<HttpResponse>();

            httpResponse.Setup(x => x.Headers).Returns(new Mock<HeaderDictionary>().Object);
            context.Setup(x => x.Response).Returns(httpResponse.Object);
            req.Setup(x => x.HttpContext).Returns(context.Object);

            DateTime? dateTime = DateTime.Now;
            var headers = new HeaderDictionary() {
                { "if-modified-since", DateTime.Now.ToString() }
            };
            req.Setup(x => x.Headers).Returns(headers);
            var modifiedTableName = typeof(LocationOverviewDto);
            _tableTrackerService.Setup(x => x.GetLastDateModified(modifiedTableName)).Returns(Task.FromResult(dateTime));
            _tableTrackerService.Setup(x => x.HasTableBeenModified(It.IsAny<DateTime>(), dateTime)).Returns(true);
            _locationOverviewService.Setup(x => x.Get()).Returns(Task.FromResult(fakeResult.AsEnumerable()));
            var log = new Mock<ILogger>().Object;

            //act
            IActionResult result = await _sut.Run(req.Object, log);

            //assert
            var expected = 200;
            var actual = (OkLastModifiedResult)result;
            Assert.Equal(expected, actual.StatusCode);
        }

        [Fact]
        public async Task CannotCallRunWithNullLog()
        {
            var req = new Mock<HttpRequest>();

            await Assert.ThrowsAsync<ArgumentNullException>(() => _sut.Run(req.Object, default(ILogger)));
        }
    }
}