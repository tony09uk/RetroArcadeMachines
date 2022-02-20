using System;

namespace RetroArcadeMachines.Services.Write.Exceptions
{
    public class ValueNotFoundInDatabaseException : Exception
    {
        public ValueNotFoundInDatabaseException(string message) : base(message)
        {

        }
    }
}
