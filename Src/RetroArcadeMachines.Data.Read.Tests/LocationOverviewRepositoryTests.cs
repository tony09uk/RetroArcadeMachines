namespace RetroArcadeMachines.Data.Read.Tests
{
    using RetroArcadeMachines.Data.Read;
    using System;
    using Xunit;
    using Moq;
    using RetroArcadeMachines.Data.Read.Interfaces;
    using RetroArcadeMachines.Shared.Models;

    public class LocationOverviewRepositoryTests
    {
        private LocationOverviewRepository _sut;
        private IProviderReadRepository<LocationOverviewModel> _context;

        public LocationOverviewRepositoryTests()
        {
            _context = new Mock<IProviderReadRepository<LocationOverviewModel>>().Object;
            _sut = new LocationOverviewRepository(_context);
        }

        [Fact]
        public void CanConstruct()
        {
            var instance = new LocationOverviewRepository(_context);
            Assert.NotNull(instance);
        }

        [Fact]
        public void CannotConstructWithNullContext()
        {
            Assert.Throws<ArgumentNullException>(() => new LocationOverviewRepository(default(IProviderReadRepository<LocationOverviewModel>)));
        }
    }
}