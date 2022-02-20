using RetroArcadeMachines.Data.Write.Interfaces;
using RetroArcadeMachines.Shared.Models;

namespace RetroArcadeMachines.Data.Write
{
    public class LocationDetailsWriteRepository : BaseWriteRepository<LocationDetailsModel>
    {
        public const string TableName = "LocationsDetails";

        public LocationDetailsWriteRepository(IProviderWriteRepository<LocationDetailsModel> providerWriteRepository) : base(providerWriteRepository)
        {
        }
    }
}
