namespace RetroArcadeMachines.Data.Read.Tests
{
    using RetroArcadeMachines.Data.Read;
    using System;
    using Xunit;
    using Moq;
    using RetroArcadeMachines.Data.Read.Interfaces;
    using RetroArcadeMachines.Shared.Models;
    using System.Globalization;

    public class TableTrackerRepositoryTests
    {
        private TableTrackerRepository _sut;
        private IProviderReadRepository<TableTrackerModel> _readRepository;

        public TableTrackerRepositoryTests()
        {
            _readRepository = new Mock<IProviderReadRepository<TableTrackerModel>>().Object;
            _sut = new TableTrackerRepository(_readRepository);
        }

        [Fact]
        public void CanConstruct()
        {
            var instance = new TableTrackerRepository(_readRepository);
            Assert.NotNull(instance);
        }

        [Fact]
        public void CannotConstructWithNullReadRepository()
        {
            Assert.Throws<ArgumentNullException>(() => new TableTrackerRepository(default(IProviderReadRepository<TableTrackerModel>)));
        }

        [Fact]
        public void CanGetDateStorageCulture()
        {
            Assert.IsType<CultureInfo>(_sut.DateStorageCulture);
        }
    }
}