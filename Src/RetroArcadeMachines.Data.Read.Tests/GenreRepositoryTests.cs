namespace RetroArcadeMachines.Data.Read.Tests
{
    using RetroArcadeMachines.Data.Read;
    using System;
    using Xunit;
    using Moq;
    using RetroArcadeMachines.Data.Read.Interfaces;
    using RetroArcadeMachines.Shared.Models;

    public class GenreRepositoryTests
    {
        private GenreRepository _sut;
        private IProviderReadRepository<GenreModel> _readRepository;

        public GenreRepositoryTests()
        {
            _readRepository = new Mock<IProviderReadRepository<GenreModel>>().Object;
            _sut = new GenreRepository(_readRepository);
        }

        [Fact]
        public void CanConstruct()
        {
            var instance = new GenreRepository(_readRepository);
            Assert.NotNull(instance);
        }

        [Fact]
        public void CannotConstructWithNullReadRepository()
        {
            Assert.Throws<ArgumentNullException>(() => new GenreRepository(default(IProviderReadRepository<GenreModel>)));
        }
    }
}