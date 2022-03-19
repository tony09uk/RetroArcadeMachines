namespace RetroArcadeMachines.Data.Write.Tests
{
    using RetroArcadeMachines.Data.Write;
    using System;
    using Xunit;
    using Moq;
    using RetroArcadeMachines.Data.Write.Interfaces;
    using RetroArcadeMachines.Shared.Models;

    public class LocationDetailsWriteRepositoryTests
    {
        private LocationDetailsWriteRepository _sut;
        private IProviderWriteRepository<LocationDetailsModel> _providerWriteRepository;

        public LocationDetailsWriteRepositoryTests()
        {
            _providerWriteRepository = new Mock<IProviderWriteRepository<LocationDetailsModel>>().Object;
            _sut = new LocationDetailsWriteRepository(_providerWriteRepository);
        }

        [Fact]
        public void CanConstruct()
        {
            var instance = new LocationDetailsWriteRepository(_providerWriteRepository);
            Assert.NotNull(instance);
        }

        [Fact]
        public void CannotConstructWithNullProviderWriteRepository()
        {
            Assert.Throws<ArgumentNullException>(() => new LocationDetailsWriteRepository(default(IProviderWriteRepository<LocationDetailsModel>)));
        }
    }
}