using RetroArcadeMachines.Data.Read.Interfaces;
using RetroArcadeMachines.Shared.Models;

namespace RetroArcadeMachines.Data.Read
{
    public class RoadmapRepository : BaseRepository<RoadmapItemModel>
    {
        public const string TableName = "Roadmaps";

        public RoadmapRepository(IProviderReadRepository<RoadmapItemModel> context) : base(context)
        {
        }
    }
}
