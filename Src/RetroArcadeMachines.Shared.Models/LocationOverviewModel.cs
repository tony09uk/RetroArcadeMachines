using Amazon.DynamoDBv2.DataModel;

namespace RetroArcadeMachines.Shared.Models
{
    [DynamoDBTable("LocationsOverview")]
    public class LocationOverviewModel : LocationBaseModel
    {
        public string Name { get; set; }
        public bool IsRetroGamesOnly { get; set; }
        public string Town { get; set; }
        public decimal? EntryPrice { get; set; }
        public decimal Rating { get; set; }
        public bool IsChildFriendly { get; set; }
        public bool IsFoodServed { get; set; }
    }
}
