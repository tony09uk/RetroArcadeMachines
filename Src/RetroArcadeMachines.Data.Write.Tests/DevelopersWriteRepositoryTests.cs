namespace RetroArcadeMachines.Data.Write.Tests
{
    using RetroArcadeMachines.Data.Write;
    using System;
    using Xunit;
    using Moq;
    using RetroArcadeMachines.Data.Write.Interfaces;
    using RetroArcadeMachines.Shared.Models;

    public class DevelopersWriteRepositoryTests
    {
        private DevelopersWriteRepository _sut;
        private IProviderWriteRepository<DeveloperModel> _providerWriteRepository;

        public DevelopersWriteRepositoryTests()
        {
            _providerWriteRepository = new Mock<IProviderWriteRepository<DeveloperModel>>().Object;
            _sut = new DevelopersWriteRepository(_providerWriteRepository);
        }

        [Fact]
        public void CanConstruct()
        {
            var instance = new DevelopersWriteRepository(_providerWriteRepository);
            Assert.NotNull(instance);
        }

        [Fact]
        public void CannotConstructWithNullProviderWriteRepository()
        {
            Assert.Throws<ArgumentNullException>(() => new DevelopersWriteRepository(default(IProviderWriteRepository<DeveloperModel>)));
        }
    }
}