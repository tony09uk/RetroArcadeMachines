namespace RetroArcadeMachines.Data.Read.Tests
{
    using RetroArcadeMachines.Data.Read;
    using System;
    using Xunit;
    using Moq;
    using RetroArcadeMachines.Data.Read.Interfaces;
    using RetroArcadeMachines.Shared.Models;

    public class LocationDetailsRepositoryTests
    {
        private LocationDetailsRepository _sut;
        private IProviderReadRepository<LocationDetailsModel> _context;

        public LocationDetailsRepositoryTests()
        {
            _context = new Mock<IProviderReadRepository<LocationDetailsModel>>().Object;
            _sut = new LocationDetailsRepository(_context);
        }

        [Fact]
        public void CanConstruct()
        {
            var instance = new LocationDetailsRepository(_context);
            Assert.NotNull(instance);
        }

        [Fact]
        public void CannotConstructWithNullContext()
        {
            Assert.Throws<ArgumentNullException>(() => new LocationDetailsRepository(default(IProviderReadRepository<LocationDetailsModel>)));
        }
    }
}