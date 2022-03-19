namespace RetroArcadeMachines.Data.Write.Tests
{
    using RetroArcadeMachines.Data.Write;
    using System;
    using Xunit;
    using Moq;
    using RetroArcadeMachines.Data.Write.Interfaces;
    using RetroArcadeMachines.Shared.Models;

    public class LocationOverviewWriteRepositoryTests
    {
        private LocationOverviewWriteRepository _sut;
        private IProviderWriteRepository<LocationOverviewModel> _context;

        public LocationOverviewWriteRepositoryTests()
        {
            _context = new Mock<IProviderWriteRepository<LocationOverviewModel>>().Object;
            _sut = new LocationOverviewWriteRepository(_context);
        }

        [Fact]
        public void CanConstruct()
        {
            var instance = new LocationOverviewWriteRepository(_context);
            Assert.NotNull(instance);
        }

        [Fact]
        public void CannotConstructWithNullContext()
        {
            Assert.Throws<ArgumentNullException>(() => new LocationOverviewWriteRepository(default(IProviderWriteRepository<LocationOverviewModel>)));
        }
    }
}