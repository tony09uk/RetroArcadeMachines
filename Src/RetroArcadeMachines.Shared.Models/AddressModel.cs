namespace RetroArcadeMachines.Shared.Models
{
    // todo:
    // need to create a convention that will help identify the model is not expected to change
    // or grow differenlty to the dto classes
    public class AddressModel
    {
        public string LineOne { get; set; }
        public string LineTwo { get; set; }
        public string LineThree { get; set; }
        public string Town { get; set; }
        public string Country { get; set; }
        public string Postalcode1 { get; set; } // todo: update the database with this change
        public string Postalcode2 { get; set; }
    }
}
