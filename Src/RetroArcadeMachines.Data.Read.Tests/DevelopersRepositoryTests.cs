namespace RetroArcadeMachines.Data.Read.Tests
{
    using RetroArcadeMachines.Data.Read;
    using System;
    using Xunit;
    using Moq;
    using RetroArcadeMachines.Data.Read.Interfaces;
    using RetroArcadeMachines.Shared.Models;

    public class DevelopersRepositoryTests
    {
        private DevelopersRepository _sut;
        private IProviderReadRepository<DeveloperModel> _readRepository;

        public DevelopersRepositoryTests()
        {
            _readRepository = new Mock<IProviderReadRepository<DeveloperModel>>().Object;
            _sut = new DevelopersRepository(_readRepository);
        }

        [Fact]
        public void CanConstruct()
        {
            var instance = new DevelopersRepository(_readRepository);
            Assert.NotNull(instance);
        }

        [Fact]
        public void CannotConstructWithNullReadRepository()
        {
            Assert.Throws<ArgumentNullException>(() => new DevelopersRepository(default(IProviderReadRepository<DeveloperModel>)));
        }
    }
}