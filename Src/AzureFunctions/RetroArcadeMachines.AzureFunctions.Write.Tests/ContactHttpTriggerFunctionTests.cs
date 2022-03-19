namespace RetroArcadeMachines.AzureFunctions.Write.Tests
{
    using RetroArcadeMachines.AzureFunctions.Write;
    using System;
    using Xunit;
    using Moq;
    using RetroArcadeMachines.Services.Write;
    using RetroArcadeMachines.Shared.Models.Requests;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Logging;
    using Microsoft.Azure.WebJobs;
    using Microsoft.Azure.WebJobs.Host;
    using Microsoft.Azure.WebJobs.Host.Executors;
    using System.Threading.Tasks;
    using System.IO;
    using Newtonsoft.Json;
    using System.Text;
    using Microsoft.AspNetCore.Mvc;
    using System.Linq;
    using System.Collections.Generic;

    public class ContactHttpTriggerFunctionTests
    {
        private Mock<ICloudQueue<ContactFormRequestModel>> _cloudQueueMock;
        private Mock<ILogger> _log;
        private ContactFormRequestModel _form;
        private ContactHttpTriggerFunction _sut;
        private Mock<HttpRequest> _req;
        private Mock<ExecutionContext> _context;

        public ContactHttpTriggerFunctionTests()
        {
            _cloudQueueMock = new Mock<ICloudQueue<ContactFormRequestModel>>();
            _log = new Mock<ILogger>();
            _sut = new ContactHttpTriggerFunction(_cloudQueueMock.Object);
            _req = new Mock<HttpRequest>();
            _context = new Mock<ExecutionContext>();
        }

        [Fact]
        public async Task InvalidFormReturnsBadRequest()
        {
            var formByteArray = ToByteArray(new ContactFormRequestModel());
            _req.Setup(x => x.Body).Returns(new MemoryStream(formByteArray));

            var expected = new BadRequestObjectResult("");
            var actual = await _sut.Run(_req.Object, _log.Object, _context.Object);

            Assert.Equal(expected.GetType(), actual.GetType());
        }

        [Fact]
        public async Task InvalidFormReturnsAllErrors()
        {
            var formByteArray = ToByteArray(new ContactFormRequestModel());
            _req.Setup(x => x.Body).Returns(new MemoryStream(formByteArray));

            IActionResult result = await _sut.Run(_req.Object, _log.Object, _context.Object);
            var resultObject = (BadRequestObjectResult)result;

            var serilizedResultObject = JsonConvert.SerializeObject(resultObject.Value);
            var actual = JsonConvert.DeserializeObject<IEnumerable<FakeContactFormErrorResponseClass>>(serilizedResultObject);

            var expected = 5;

            Assert.Equal(expected, actual.Count());
        }

        [Fact]
        public async Task ValidFormReturnsReturnsOkObjectResult()
        {
            _form = new ContactFormRequestModel
            {
                FirstName = "asdfghjkl",
                LastName = "wertyu",
                Email = "afdsa@afds.com",
                Subject = "iopmnbvcxxxxz",
                Message = "gvnvhcgufdxcftwerty"
            };

            var formByteArray = ToByteArray(_form);
            _req.Setup(x => x.Body).Returns(new MemoryStream(formByteArray));

            var expected = new OkObjectResult(true);
            var actual = await _sut.Run(_req.Object, _log.Object, _context.Object);

            Assert.Equal(expected.GetType(), actual.GetType());
        }

        private byte[] ToByteArray(object obj)
        {
            return Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(obj));
        }

        [Fact]
        public async Task CannotCallRunWithNullReq()
        {
            await Assert.ThrowsAsync<NullReferenceException>(() => _sut.Run(default(HttpRequest), new Mock<ILogger>().Object, new ExecutionContext { InvocationId = new Guid("effbd779-011c-403b-850c-4cf09c71ca4f"), FunctionName = "TestValue1674047010", FunctionDirectory = "TestValue375099130", FunctionAppDirectory = "TestValue134218837", RetryContext = new RetryContext { RetryCount = 1198961608, MaxRetryCount = 10509001, Exception = new Exception(), Instance = new Mock<IFunctionInstance>().Object } }));
        }

        [Fact]
        public async Task CannotCallRunWithNullLog()
        {
            var req = new Mock<HttpRequest>();
            await Assert.ThrowsAsync<ArgumentNullException>(() => _sut.Run(req.Object, default(ILogger), new ExecutionContext { InvocationId = new Guid("d095ba63-f56c-4552-8c3e-887bc7ed0592"), FunctionName = "TestValue576161294", FunctionDirectory = "TestValue918779482", FunctionAppDirectory = "TestValue2045176730", RetryContext = new RetryContext { RetryCount = 1595861927, MaxRetryCount = 950461010, Exception = new Exception(), Instance = new Mock<IFunctionInstance>().Object } }));
        }

        [Fact]
        public async Task CannotCallRunWithNullContext()
        {
            var req = new Mock<HttpRequest>();
            await Assert.ThrowsAsync<ArgumentNullException>(() => _sut.Run(req.Object, new Mock<ILogger>().Object, default(ExecutionContext)));
        }
    }
}