using AutoMapper;
using RetroArcadeMachines.Data.Read.Interfaces;
using RetroArcadeMachines.Data.Read.Models;
using RetroArcadeMachines.Services.Read.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetroArcadeMachines.Services.Read
{
    public class GamesService : IGamesService
    {
        private readonly IMapper _mapper;
        private readonly IGamesRepository _gamesRepository;

        public GamesService(
            IMapper mapper,
            IGamesRepository gamesRepository)
        {
            _mapper = mapper;
            _gamesRepository = gamesRepository;
        }

        public async Task<IEnumerable<GameOverviewDto>> Get()
        {
            try
            {
                IEnumerable<GameModel> games = await _gamesRepository.Get();
                //todo: need to get genres
                //todo: need to get developers
                //todo: map the above
                var gameOverviewItems = _mapper.Map<IEnumerable<GameOverviewDto>>(games);
                return gameOverviewItems.OrderBy(x => x.Title);
            }
            catch (Exception ex) //todo: watch for the expected exceptions only
            {
                throw ex;
            }
        }
    }
}
