using System;

namespace RetroArcadeMachines.Auth.Models
{
    public class AppUser
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        //public string Password { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Token { get; set; }
        public string Name { 
            get { return $"{Firstname} {Lastname}"; }
        }
    }
}
