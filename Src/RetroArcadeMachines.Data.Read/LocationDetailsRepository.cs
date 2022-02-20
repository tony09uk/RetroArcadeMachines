using RetroArcadeMachines.Data.Read.Interfaces;
using RetroArcadeMachines.Shared.Models;

namespace RetroArcadeMachines.Data.Read
{
    public class LocationDetailsRepository : BaseRepository<LocationDetailsModel>
    {
        public const string TableName = "LocationsDetails";

        public LocationDetailsRepository(IProviderReadRepository<LocationDetailsModel> context) : base(context)
        {
        }
    }
}
