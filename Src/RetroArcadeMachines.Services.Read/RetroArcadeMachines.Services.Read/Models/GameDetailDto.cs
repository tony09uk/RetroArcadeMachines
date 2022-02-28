using System.Collections.Generic;

namespace RetroArcadeMachines.Services.Read.Models
{
    public class GameDetailDto : GameDto
    {
        public IEnumerable<string> ImageListUrls { get; set; }
        public string VideoClipUrl { get; set; }
        public decimal Rating { get; set; }
        public string Description{ get; set; }
    }
}
