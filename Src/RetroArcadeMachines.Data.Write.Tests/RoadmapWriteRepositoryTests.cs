namespace RetroArcadeMachines.Data.Write.Tests
{
    using RetroArcadeMachines.Data.Write;
    using System;
    using Xunit;
    using Moq;
    using RetroArcadeMachines.Data.Write.Interfaces;
    using RetroArcadeMachines.Shared.Models;

    public class RoadmapWriteRepositoryTests
    {
        private RoadmapWriteRepository _sut;
        private IProviderWriteRepository<RoadmapItemModel> _context;

        public RoadmapWriteRepositoryTests()
        {
            _context = new Mock<IProviderWriteRepository<RoadmapItemModel>>().Object;
            _sut = new RoadmapWriteRepository(_context);
        }

        [Fact]
        public void CanConstruct()
        {
            var instance = new RoadmapWriteRepository(_context);
            Assert.NotNull(instance);
        }

        [Fact]
        public void CannotConstructWithNullContext()
        {
            Assert.Throws<ArgumentNullException>(() => new RoadmapWriteRepository(default(IProviderWriteRepository<RoadmapItemModel>)));
        }
    }
}