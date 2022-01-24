﻿namespace RetroArcadeMachines.Shared.Models.Requests
{
    public class AddressRequestModel
    {
        public string Id { get; set; }
        public string LineOne { get; set; }
        public string LineTwo { get; set; }
        public string LineThree { get; set; }
        public string Country { get; set; }
        public string Town { get; set; }
        public string Postalcode1 { get; set; }
        public string Postalcode2 { get; set; }
    }
}
