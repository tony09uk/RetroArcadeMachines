namespace RetroArcadeMachines.Shared.Models
{
    // todo:
    // need to create a convention that will help identify the model is not expected to change
    // or grow differenlty to the dto classes
    public class PhoneNumberModel
    {
        public string StdCode { get; set; }
        public string Number { get; set; }
    }
}
