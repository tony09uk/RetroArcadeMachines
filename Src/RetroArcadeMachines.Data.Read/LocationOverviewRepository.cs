using RetroArcadeMachines.Data.Read.Interfaces;
using RetroArcadeMachines.Shared.Models;

namespace RetroArcadeMachines.Data.Read
{
    public class LocationOverviewRepository : BaseRepository<LocationOverviewModel>
    {
        public const string TableName = "LocationsOverview";

        public LocationOverviewRepository(IProviderReadRepository<LocationOverviewModel> context) : base(context)
        {
        }
    }
}
