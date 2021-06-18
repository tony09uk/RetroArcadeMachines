namespace RetroArcadeMachines.Services.Read.Models
{
    public class LocationOverviewDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string IsRetroGamesOnly { get; set; }
        public string Town { get; set; }
        public decimal? EntryPrice { get; set; }
        public decimal Rating { get; set; }
        public bool IsChildFriendly { get; set; }
        public bool IsFoodServed { get; set; }
    }
}
