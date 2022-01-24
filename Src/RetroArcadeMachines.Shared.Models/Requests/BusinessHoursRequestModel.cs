namespace RetroArcadeMachines.Shared.Models.Requests
{
    public class BusinessHoursRequestModel
    {
        public DaysOfTheWeek DayOfTheWeek { get; set; }
        public string OpeningTime { get; set; }
        public string ClosingTime { get; set; }
    }
}
