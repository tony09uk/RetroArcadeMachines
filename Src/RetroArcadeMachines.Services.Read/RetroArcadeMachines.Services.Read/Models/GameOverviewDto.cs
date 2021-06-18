using System;
using System.Collections.Generic;

namespace RetroArcadeMachines.Services.Read.Models
{
    public class GameOverviewDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public int ReleaseYear { get; set; }
        public int MaxPlayers { get; set; }
        public string ThumbnailUrl { get; set; }

        public IEnumerable<string> DeveloperList { get; set; }
        public IEnumerable<string> GenreList { get; set; }
    }
}
