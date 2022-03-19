namespace RetroArcadeMachines.Data.Write.Tests
{
    using RetroArcadeMachines.Data.Write;
    using System;
    using Xunit;
    using Moq;
    using RetroArcadeMachines.Data.Write.Interfaces;
    using RetroArcadeMachines.Shared.Models;
    using System.Globalization;

    public class TableTrackerRepositoryTests
    {
        private TableTrackerRepository _sut;
        private IProviderWriteRepository<TableTrackerModel> _providerWriteRepository;

        public TableTrackerRepositoryTests()
        {
            _providerWriteRepository = new Mock<IProviderWriteRepository<TableTrackerModel>>().Object;
            _sut = new TableTrackerRepository(_providerWriteRepository);
        }

        [Fact]
        public void CanConstruct()
        {
            var instance = new TableTrackerRepository(_providerWriteRepository);
            Assert.NotNull(instance);
        }

        [Fact]
        public void CannotConstructWithNullProviderWriteRepository()
        {
            Assert.Throws<ArgumentNullException>(() => new TableTrackerRepository(default(IProviderWriteRepository<TableTrackerModel>)));
        }

        [Fact]
        public void CanGetDateStorageCulture()
        {
            Assert.IsType<CultureInfo>(TableTrackerRepository.DateStorageCulture);
        }
    }
}