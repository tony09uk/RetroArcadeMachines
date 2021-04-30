using System;

namespace RetroArcadeMachines.Data.Read.Models
{
    public class RoadmapItemModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsStarted { get; set; }
        public int PercentageCompleted { get; set; }
        public int Order { get; set; }
    }
}
