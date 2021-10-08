namespace RetroArcadeMachines.Services.Read.Models
{
    public class BusinessHours
    {
        public DaysOfTheWeek DayOfTheWeek { get; set; }
        public string OpeningTime { get; set; }
        public string ClosingTime { get; set; }
    }
}
