namespace RetroArcadeMachines.Data.Read.Tests
{
    using RetroArcadeMachines.Data.Read;
    using System;
    using Xunit;
    using Moq;
    using RetroArcadeMachines.Data.Read.Interfaces;
    using RetroArcadeMachines.Shared.Models;

    public class GamesRepositoryTests
    {
        private GamesRepository _sut;
        private IProviderReadRepository<GameModel> _readRepository;

        public GamesRepositoryTests()
        {
            _readRepository = new Mock<IProviderReadRepository<GameModel>>().Object;
            _sut = new GamesRepository(_readRepository);
        }

        [Fact]
        public void CanConstruct()
        {
            var instance = new GamesRepository(_readRepository);
            Assert.NotNull(instance);
        }

        [Fact]
        public void CannotConstructWithNullReadRepository()
        {
            Assert.Throws<ArgumentNullException>(() => new GamesRepository(default(IProviderReadRepository<GameModel>)));
        }
    }
}