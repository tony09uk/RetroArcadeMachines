using System;

namespace RetroArcadeMachines.Services.Write.Models
{
    public class WriteRequestResult
    {
        public WriteRequestStatus Status { get; set; }
        public Guid? ItemId { get; set; }
    }
}
