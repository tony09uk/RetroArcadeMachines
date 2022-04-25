namespace RetroArcadeMachines.AzureFunctions.Write.Auth.Tests
{
    using RetroArcadeMachines.AzureFunctions.Write.Auth;
    using System;
    using Xunit;
    using Moq;
    using AutoMapper;
    using RetroArcadeMachines.Services.Write;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Logging;
    using System.Threading.Tasks;
    using System.Threading;
    using System.Net.Http;
    using System.Text;
    using Newtonsoft.Json;
    using Microsoft.AspNetCore.Mvc;
    using System.IO;
    using RetroArcadeMachines.Shared.Models.Requests;
    using System.Collections.Generic;
    using System.Linq;
    using RetroArcadeMachines.Services.Write.Models;
    using RetroArcadeMachines.AzureFunctions.Write.Auth.TokenHelpers;

    public class LocationHttpTriggerFunctionTests
    {
        private LocationHttpTriggerFunction _sut;
        private Mock<ILogger> _log;
        private Mock<IMapper> _mapper;
        private Mock<ILocationDetailsService> _locationDetailsService;
        private Mock<HttpRequest> _httpRequest;
        private Mock<ExecutionContext> _context;
        private Mock<HttpResponse> _httpResponse;
        private Mock<HttpRequestMessage> _httpRequestMessage;
        private Mock<FacebookTokenValidator> _tokenValidator;

        public LocationHttpTriggerFunctionTests()
        {
            _mapper = new Mock<IMapper>();
            _log = new Mock<ILogger>();
            _httpRequest = new Mock<HttpRequest>();
            _locationDetailsService = new Mock<ILocationDetailsService>();
            _httpResponse = new Mock<HttpResponse>();
            _httpRequestMessage = new Mock<HttpRequestMessage>();
            _tokenValidator = new Mock<FacebookTokenValidator>();

            _sut = new LocationHttpTriggerFunction(_mapper.Object, _locationDetailsService.Object, _tokenValidator.Object);
        }

        [Fact]
        public async Task InvalidRequestReturnsBadRequest()
        {
            var locationDetailsRequestModel = new LocationDetailsRequestModel
            {
                Address = new Shared.Models.AddressModel { },
                AssignedGamesList = new List<AssignedGamesRequestModel>(),
                BusinessHoursList = new List<BusinessHoursRequestModel>(),
                ImageUrlList = new List<string>(),
                PhoneNumberList = new List<string>(),
            };

            var formByteArray = ToByteArray(locationDetailsRequestModel);
            _httpRequest.Setup(x => x.Body).Returns(new MemoryStream(formByteArray));

            var expected = new BadRequestObjectResult("");
            var actual = await _sut.Run(_httpRequest.Object, _log.Object);

            Assert.Equal(expected.GetType(), actual.GetType());
        }

        [Fact]
        public async Task InvalidRequestReturnsAllErrors()
        {
            var locationDetailsRequestModel = new LocationDetailsRequestModel
            {
                Address = new Shared.Models.AddressModel { },
                AssignedGamesList = new List<AssignedGamesRequestModel>(),
                BusinessHoursList = new List<BusinessHoursRequestModel>(),
                ImageUrlList = new List<string>(),
                PhoneNumberList = new List<string>(),
            };

            var formByteArray = ToByteArray(locationDetailsRequestModel);
            _httpRequest.Setup(x => x.Body).Returns(new MemoryStream(formByteArray));

            IActionResult result = await _sut.Run(_httpRequest.Object, _log.Object);
            var resultObject = (BadRequestObjectResult)result;
            var serilizedResultObject = JsonConvert.SerializeObject(resultObject.Value);
            var actual = JsonConvert.DeserializeObject<IEnumerable<FakeErrorResponse>>(serilizedResultObject);

            var expected = 4;

            Assert.Equal(expected, actual.Count());
        }

        [Fact]
        public async Task SuccessfulRequestReturnsCreatedResult()
        {
            var locationDetailsRequestModel = CreateValidLocationDetailsRequestModel();

            var formByteArray = ToByteArray(locationDetailsRequestModel);
            _httpRequest.Setup(x => x.Body).Returns(new MemoryStream(formByteArray));

            var addResult = new WriteRequestResult { Status = WriteRequestStatus.Success, ItemId = Guid.NewGuid() };
            _locationDetailsService.Setup(x => x.Add(It.IsAny<LocationDetailsDto>(), It.IsAny<string>())).Returns(Task.FromResult(addResult));
            _mapper.Setup(x => x.Map<LocationDetailsDto>(It.IsAny<LocationDetailsRequestModel>()))
                .Returns((LocationDetailsRequestModel source) =>
                {
                    return new LocationDetailsDto() { GameOverviewList = new List<AssignedGamesDto>() };
                });
            Environment.SetEnvironmentVariable("ReadBaseUrl", "testConfigValue");

            var expected = new CreatedResult("", new { });
            var actual = await _sut.Run(_httpRequest.Object, _log.Object);

            Assert.Equal(expected.GetType(), actual.GetType());
            Environment.SetEnvironmentVariable("ReadBaseUrl", null);
        }

        [Fact]
        public async Task ExceptionWhenAddingReturns500Result()
        {
            var locationDetailsRequestModel = CreateValidLocationDetailsRequestModel();

            var formByteArray = ToByteArray(locationDetailsRequestModel);
            _httpRequest.Setup(x => x.Body).Returns(new MemoryStream(formByteArray));

            _locationDetailsService.Setup(x => x.Add(It.IsAny<LocationDetailsDto>(), It.IsAny<string>())).Throws(new Exception());
            _mapper.Setup(x => x.Map<LocationDetailsDto>(It.IsAny<LocationDetailsRequestModel>()))
                .Returns((LocationDetailsRequestModel source) =>
                {
                    return new LocationDetailsDto() { GameOverviewList = new List<AssignedGamesDto>() };
                });
            Environment.SetEnvironmentVariable("ReadBaseUrl", "testConfigValue");

            var expected = new StatusCodeResult(StatusCodes.Status500InternalServerError);
            var actual = await _sut.Run(_httpRequest.Object, _log.Object);

            Assert.Equal(expected.GetType(), actual.GetType());
            Environment.SetEnvironmentVariable("ReadBaseUrl", null);
        }

        [Fact]
        public async Task FailedRequestReturnsStatus500Result()
        {
            var locationDetailsRequestModel = CreateValidLocationDetailsRequestModel();

            var formByteArray = ToByteArray(locationDetailsRequestModel);
            _httpRequest.Setup(x => x.Body).Returns(new MemoryStream(formByteArray));

            var addResult = new WriteRequestResult { Status = WriteRequestStatus.Failed, ItemId = Guid.NewGuid() };
            _locationDetailsService.Setup(x => x.Add(It.IsAny<LocationDetailsDto>(), It.IsAny<string>())).Returns(Task.FromResult(addResult));
            _mapper.Setup(x => x.Map<LocationDetailsDto>(It.IsAny<LocationDetailsRequestModel>()))
                .Returns((LocationDetailsRequestModel source) =>
                {
                    return new LocationDetailsDto() { GameOverviewList = new List<AssignedGamesDto>() };
                });
            Environment.SetEnvironmentVariable("ReadBaseUrl", "testConfigValue");

            var expected = new StatusCodeResult(StatusCodes.Status500InternalServerError);
            var actual = await _sut.Run(_httpRequest.Object, _log.Object);

            Assert.Equal(expected.GetType(), actual.GetType());
            Environment.SetEnvironmentVariable("ReadBaseUrl", null);
        }

        [Fact]
        public async Task RequestContainingExistingLocationReturnsAccepted()
        {
            var locationDetailsRequestModel = CreateValidLocationDetailsRequestModel();

            var formByteArray = ToByteArray(locationDetailsRequestModel);
            _httpRequest.Setup(x => x.Body).Returns(new MemoryStream(formByteArray));

            var addResult = new WriteRequestResult { Status = WriteRequestStatus.Duplicate, ItemId = Guid.NewGuid() };
            _locationDetailsService.Setup(x => x.Add(It.IsAny<LocationDetailsDto>(), It.IsAny<string>())).Returns(Task.FromResult(addResult));
            _mapper.Setup(x => x.Map<LocationDetailsDto>(It.IsAny<LocationDetailsRequestModel>()))
                .Returns((LocationDetailsRequestModel source) =>
                {
                    return new LocationDetailsDto() { GameOverviewList = new List<AssignedGamesDto>() };
                });
            Environment.SetEnvironmentVariable("ReadBaseUrl", "testConfigValue");

            var expected = new AcceptedResult("", new { });
            var actual = await _sut.Run(_httpRequest.Object, _log.Object);

            Assert.Equal(expected.GetType(), actual.GetType());
            Environment.SetEnvironmentVariable("ReadBaseUrl", null);
        }

        [Fact]
        public async Task CannotCallRunWithNullLog()
        {
            await Assert.ThrowsAsync<ArgumentNullException>(() => _sut.Run(_httpRequest.Object, default(ILogger)));
        }

        private byte[] ToByteArray(object obj)
        {
            return Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(obj));
        }

        private LocationDetailsRequestModel CreateValidLocationDetailsRequestModel()
        {
            return  new LocationDetailsRequestModel
            {
                Lat = "1.2324",
                Lng = "1.23234",
                Address = new Shared.Models.AddressModel
                {
                    LineOne = "Test line",
                    Country = "test country"
                },
                AssignedGamesList = new List<AssignedGamesRequestModel>(),
                BusinessHoursList = new List<BusinessHoursRequestModel>(),
                ImageUrlList = new List<string>(),
                PhoneNumberList = new List<string>(),
            };
        }
    }
}