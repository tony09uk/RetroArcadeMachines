using System.Collections.Generic;

namespace RetroArcadeMachines.Services.Read.Tests
{
    using Microsoft.Extensions.Logging;
    using Moq;
    using RetroArcadeMachines.Data.Read.Interfaces;
    using RetroArcadeMachines.Services.Read;
    using RetroArcadeMachines.Shared.Models;
    using System;
    using System.Globalization;
    using System.Threading.Tasks;
    using Xunit;

    public class TableTrackerServiceTests
    {
        private TableTrackerService _sut;
        private Mock<ICachingHelperService> _cachingHelperServiceMock;
        private Mock<IReadRepository<TableTrackerModel>> _readRepositoryMock;
        private ILogger<TableTrackerService> _log;

        public static IEnumerable<object[]> InvalidTableTrackerDate => new List<object[]>
        {
            new object[] { new TableTrackerModel { DateTime = null } },
            new object[] { new TableTrackerModel { DateTime = "" } },
            new object[] { new TableTrackerModel { DateTime = "999999" } }
        };

        public TableTrackerServiceTests()
        {
            _cachingHelperServiceMock = new Mock<ICachingHelperService>();
            _readRepositoryMock = new Mock<IReadRepository<TableTrackerModel>>();
            _log = new Mock<ILogger<TableTrackerService>>().Object;
            _sut = new TableTrackerService(_cachingHelperServiceMock.Object, _readRepositoryMock.Object, _log);
        }

        [Fact]
        public void CanConstruct()
        {
            var instance = new TableTrackerService(_cachingHelperServiceMock.Object, _readRepositoryMock.Object, _log);
            Assert.NotNull(instance);
        }

        [Fact]
        public void CannotConstructWithNullCachingHelperService()
        {
            Assert.Throws<ArgumentNullException>(() => new TableTrackerService(null, new Mock<IReadRepository<TableTrackerModel>>().Object, new Mock<ILogger<TableTrackerService>>().Object));
        }

        [Fact]
        public void CannotConstructWithNullReadRepository()
        {
            Assert.Throws<ArgumentNullException>(() => new TableTrackerService(new Mock<ICachingHelperService>().Object, null, new Mock<ILogger<TableTrackerService>>().Object));
        }

        [Fact]
        public void CannotConstructWithNullLog()
        {
            Assert.Throws<ArgumentNullException>(() => new TableTrackerService(new Mock<ICachingHelperService>().Object, new Mock<IReadRepository<TableTrackerModel>>().Object, null));
        }

        [Fact]
        public async Task CannotCallGetLastDateModifiedWithNullModelType()
        {
            await Assert.ThrowsAsync<ArgumentNullException>(() => _sut.GetLastDateModified(default(Type)));
        }

        [Fact]
        public void CanReturnTrueWhenPassedDateIsNull()
        {
            var storedDate = new DateTime(1575074013);
            var actual = _sut.HasTableBeenModified(null, storedDate);
            Assert.True(actual, "If one param not passed accurate evulation cannot be made. Should be true.");
        }

        [Fact]
        public void CanReturnTrueWhenStoredDateIsNull()
        {
            var passedDate = new DateTime(12935984);
            var actual = _sut.HasTableBeenModified(passedDate, null);
            Assert.True(actual, "If one param not passed accurate evulation cannot be made. Should be true.");
        }

        [Fact]
        public void CanReturnTrueWhenPassedDateIsLessThanStoredDate()
        {
            var passedDate = DateTime.Now.AddDays(-1);
            var storedDate = DateTime.Now;

            var actual = _sut.HasTableBeenModified(passedDate, storedDate);
            Assert.True(actual);
        }

        [Fact]
        public void CanReturnTrueWhenPassedDateIsSameAsStoredDate()
        {
            var passedDate = DateTime.Now;
            var storedDate = DateTime.Now;

            var actual = _sut.HasTableBeenModified(passedDate, storedDate);
            Assert.True(actual);
        }

        [Fact]
        public void CanReturnTrueWhenStoredDateIsGreaterThanPassedDate()
        {
            var passedDate = DateTime.Now;
            var storedDate = DateTime.Now.AddDays(1);

            var actual = _sut.HasTableBeenModified(passedDate, storedDate);
            Assert.True(actual);
        }

        [Fact]
        public void CanReturnTrueWhenParamsNull()
        {
            var actual = _sut.HasTableBeenModified(null, null);
            Assert.True(actual, "If one or more params not passed accurate evulation cannot be made. Should be true.");
        }

        [Fact]
        public void CanGetDateStorageFormat()
        {
            Assert.IsType<string>(_sut.DateStorageFormat);
            Assert.Equal("s", _sut.DateStorageFormat);
        }

        [Fact]
        public void CanGetDateStorageCulture()
        {
            Assert.IsType<CultureInfo>(_sut.DateStorageCulture);
        }

        [Theory]
        [MemberData(nameof(InvalidTableTrackerDate))]
        public async Task CanReturnNullWhenTrackerTableDateCannotBeParsed(TableTrackerModel testVal)
        {
            var cacheableName = "";
            _cachingHelperServiceMock.Setup(x => x.TryGetCacheableTypeName(It.IsAny<Type>(), out cacheableName)).Returns(true);
            _readRepositoryMock.Setup(x => x.Get(It.IsAny<string>())).Returns(Task.FromResult(testVal));
            var arbitaryTypeForTestCase = typeof(TableTrackerServiceTests);
            
            var actual = await _sut.GetLastDateModified(arbitaryTypeForTestCase);
            
            Assert.Null(actual);
        }
    }
}