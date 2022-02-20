using AutoMapper;
using RetroArcadeMachines.Data.Read.Interfaces;
using RetroArcadeMachines.Services.Read.Models;
using RetroArcadeMachines.Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Services.Read
{
    public class GamesService : IGamesService
    {
        private readonly IMapper _mapper;
        private readonly IReadRepository<GameModel> _gamesRepository;

        public GamesService(
            IMapper mapper,
            IReadRepository<GameModel> gamesRepository)
        {
            _mapper = mapper;
            _gamesRepository = gamesRepository;
        }

        public async Task<IEnumerable<GameOverviewDto>> Get()
        {
            try
            {
                IEnumerable<GameModel> games = await _gamesRepository.Get();
                var gameOverviewItems = _mapper.Map<IEnumerable<GameOverviewDto>>(games);
                return gameOverviewItems.OrderBy(x => x.Title);
            }
            catch (Exception ex) //todo: watch for the expected exceptions only
            {
                return new List<GameOverviewDto>();
            }
        }

        public async Task<IEnumerable<GameOverviewDto>> Get(IEnumerable<Guid> searchElements)
        {
            IEnumerable<GameModel> games = await _gamesRepository.Get(searchElements);
            var gameOverviewItems = _mapper.Map<IEnumerable<GameOverviewDto>>(games);
            return gameOverviewItems.OrderBy(x => x.Title);
        }
    }
}
