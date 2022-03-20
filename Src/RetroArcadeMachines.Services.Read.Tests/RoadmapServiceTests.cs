namespace RetroArcadeMachines.Services.Read.Tests
{
    using RetroArcadeMachines.Services.Read;
    using System;
    using Xunit;
    using Moq;
    using AutoMapper;
    using RetroArcadeMachines.Data.Read.Interfaces;
    using RetroArcadeMachines.Shared.Models;
    using System.Threading.Tasks;
    using System.Collections.Generic;
    using RetroArcadeMachines.Services.Read.Models;
    using System.Linq;

    public class RoadmapServiceTests
    {
        private RoadmapService _testClass;
        private Mock<IMapper> _mapperMock;
        private Mock<IReadRepository<RoadmapItemModel>> _roadmapRepositoryMock;

        public RoadmapServiceTests()
        {
            _mapperMock = new Mock<IMapper>();
            _roadmapRepositoryMock = new Mock<IReadRepository<RoadmapItemModel>>();
            _testClass = new RoadmapService(_mapperMock.Object, _roadmapRepositoryMock.Object);
        }

        [Fact]
        public void CanConstruct()
        {
            var instance = new RoadmapService(_mapperMock.Object, _roadmapRepositoryMock.Object);
            Assert.NotNull(instance);
        }

        [Fact]
        public void CannotConstructWithNullMapper()
        {
            Assert.Throws<ArgumentNullException>(() => new RoadmapService(default(IMapper), new Mock<IReadRepository<RoadmapItemModel>>().Object));
        }

        [Fact]
        public void CannotConstructWithNullRoadmapRepository()
        {
            Assert.Throws<ArgumentNullException>(() => new RoadmapService(new Mock<IMapper>().Object, default(IReadRepository<RoadmapItemModel>)));
        }

        [Fact]
        public async Task CanReturnEmptyListRoadmapItemsWhenGetIsNull()
        {
            IEnumerable<RoadmapItemModel> items = null;
            IEnumerable<RoadmapItemDto> mappedItems = null;
            _roadmapRepositoryMock.Setup(x => x.Get()).Returns(Task.FromResult(items));
            _mapperMock.Setup(x => x.Map<IEnumerable<RoadmapItemDto>>(It.IsAny<IEnumerable<RoadmapItemModel>>())).Returns(mappedItems);

            var result = await _testClass.Get();
            var expected = 0;

            Assert.Equal(expected, result.Count());
        }

        [Fact]
        public async Task CanReturnOrderedListRoadmapItems()
        {
            IEnumerable<RoadmapItemModel> items = new List<RoadmapItemModel>
            {
                new RoadmapItemModel { Order = 2 },
                new RoadmapItemModel { Order = 1 },
                new RoadmapItemModel { Order = 4 }
            };
            IEnumerable<RoadmapItemDto> mappedItems = new List<RoadmapItemDto>
            {
                new RoadmapItemDto { Order = 2 },
                new RoadmapItemDto { Order = 1 },
                new RoadmapItemDto { Order = 4 }
            };
            _roadmapRepositoryMock.Setup(x => x.Get()).Returns(Task.FromResult(items));
            _mapperMock.Setup(x => x.Map<IEnumerable<RoadmapItemDto>>(It.IsAny<IEnumerable<RoadmapItemModel>>())).Returns(mappedItems);

            IEnumerable<RoadmapItemDto> result = await _testClass.Get();

            Assert.Equal(1, result.ElementAt(0).Order);
            Assert.Equal(2, result.ElementAt(1).Order);
            Assert.Equal(4, result.ElementAt(2).Order);
        }
    }
}