namespace RetroArcadeMachines.Shared.Models
{
    // todo:
    // need to create a convention that will help identify the model is not expected to change
    // or grow differenlty to the dto classes
    public class BusinessHoursModel
    {
        public DaysOfTheWeek DayOfTheWeek { get; set; }
        public string OpeningTime { get; set; }
        public string ClosingTime { get; set; }
    }
}
