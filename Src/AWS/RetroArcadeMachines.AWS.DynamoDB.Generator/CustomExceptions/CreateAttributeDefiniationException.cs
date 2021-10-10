using System;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator.CustomExceptions
{
    public class CreateAttributeDefiniationException : Exception
    {
        public CreateAttributeDefiniationException()
        {
        }

        public CreateAttributeDefiniationException(string message)
            : base(message)
        {
        }

        public CreateAttributeDefiniationException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
