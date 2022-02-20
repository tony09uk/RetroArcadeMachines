using RetroArcadeMachines.Data.Write.Interfaces;
using RetroArcadeMachines.Shared.Models;

namespace RetroArcadeMachines.Data.Write
{
    public class RoadmapWriteRepository : BaseWriteRepository<RoadmapItemModel>
    {
        public const string TableName = "Roadmaps";

        public RoadmapWriteRepository(IProviderWriteRepository<RoadmapItemModel> context) : base(context)
        {
        }
    }
}
