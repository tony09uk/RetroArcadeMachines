namespace RetroArcadeMachines.Data.Write.Tests
{
    using RetroArcadeMachines.Data.Write;
    using System;
    using Xunit;
    using Moq;
    using RetroArcadeMachines.Data.Write.Interfaces;
    using RetroArcadeMachines.Shared.Models;

    public class GamesWriteRepositoryTests
    {
        private GamesWriteRepository _sut;
        private IProviderWriteRepository<GameModel> _providerWriteRepository;

        public GamesWriteRepositoryTests()
        {
            _providerWriteRepository = new Mock<IProviderWriteRepository<GameModel>>().Object;
            _sut = new GamesWriteRepository(_providerWriteRepository);
        }

        [Fact]
        public void CanConstruct()
        {
            var instance = new GamesWriteRepository(_providerWriteRepository);
            Assert.NotNull(instance);
        }

        [Fact]
        public void CannotConstructWithNullProviderWriteRepository()
        {
            Assert.Throws<ArgumentNullException>(() => new GamesWriteRepository(default(IProviderWriteRepository<GameModel>)));
        }
    }
}