using RetroArcadeMachines.Data.Write.Interfaces;
using RetroArcadeMachines.Shared.Models;

namespace RetroArcadeMachines.Data.Write
{
    public class LocationOverviewWriteRepository : BaseWriteRepository<LocationOverviewModel>
    {
        public const string TableName = "LocationsOverview";

        public LocationOverviewWriteRepository(IProviderWriteRepository<LocationOverviewModel> context) : base(context)
        {
        }
    }
}
