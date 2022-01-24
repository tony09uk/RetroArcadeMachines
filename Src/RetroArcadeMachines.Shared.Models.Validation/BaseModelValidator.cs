using FluentValidation;

namespace RetroArcadeMachines.Shared.Models.Validation
{
    public class BaseModelValidator<T> : AbstractValidator<T>
    {
        protected readonly string _alphaNumericPattern = "^[a-zA-Z0-9]+$";
        // ### FIX THIS!!!
        protected readonly string _alphaNumericWithSpecialCharPattern = ""; // '^[a-zA-Z0-9&"/\'\-_#$£ !%)(]+$';
        protected readonly string _emailPattern = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
    }
}
