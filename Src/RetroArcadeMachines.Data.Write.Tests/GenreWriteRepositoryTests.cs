namespace RetroArcadeMachines.Data.Write.Tests
{
    using RetroArcadeMachines.Data.Write;
    using System;
    using Xunit;
    using Moq;
    using RetroArcadeMachines.Data.Write.Interfaces;
    using RetroArcadeMachines.Shared.Models;

    public class GenreWriteRepositoryTests
    {
        private GenreWriteRepository _sut;
        private IProviderWriteRepository<GenreModel> _providerWriteRepository;

        public GenreWriteRepositoryTests()
        {
            _providerWriteRepository = new Mock<IProviderWriteRepository<GenreModel>>().Object;
            _sut = new GenreWriteRepository(_providerWriteRepository);
        }

        [Fact]
        public void CanConstruct()
        {
            var instance = new GenreWriteRepository(_providerWriteRepository);
            Assert.NotNull(instance);
        }

        [Fact]
        public void CannotConstructWithNullProviderWriteRepository()
        {
            Assert.Throws<ArgumentNullException>(() => new GenreWriteRepository(default(IProviderWriteRepository<GenreModel>)));
        }
    }
}