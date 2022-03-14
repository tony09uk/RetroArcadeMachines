namespace RetroArcadeMachines.Data.Read.Tests
{
    using RetroArcadeMachines.Data.Read;
    using System;
    using Xunit;
    using Moq;
    using RetroArcadeMachines.Data.Read.Interfaces;
    using RetroArcadeMachines.Shared.Models;

    public class RoadmapRepositoryTests
    {
        private RoadmapRepository _sut;
        private IProviderReadRepository<RoadmapItemModel> _context;

        public RoadmapRepositoryTests()
        {
            _context = new Mock<IProviderReadRepository<RoadmapItemModel>>().Object;
            _sut = new RoadmapRepository(_context);
        }

        [Fact]
        public void CanConstruct()
        {
            var instance = new RoadmapRepository(_context);
            Assert.NotNull(instance);
        }

        [Fact]
        public void CannotConstructWithNullContext()
        {
            Assert.Throws<ArgumentNullException>(() => new RoadmapRepository(default(IProviderReadRepository<RoadmapItemModel>)));
        }
    }
}