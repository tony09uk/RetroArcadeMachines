﻿using FluentValidation;
using RetroArcadeMachines.Shared.Models.Requests;
using System.Linq;

namespace RetroArcadeMachines.Shared.Models.Validation
{
    public partial class ContactFormRequestModelValidator : BaseModelValidator<ContactFormRequestModel>
    {
        public ContactFormRequestModelValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage(ValidationMessageHelper.ForNotEmpty(nameof(ContactFormRequestModel.FirstName)))
                .MinimumLength(2).WithMessage("'{PropertyName}' must have a minimum of 2 charaters")
                .MaximumLength(20).WithMessage("'{PropertyName}' must have a maximum of 20 charaters")
                .Matches(_alphaNumericPattern).WithMessage("'{PropertyName}' must only contain alphanumeric charaters (a-z, A-Z, 0-9)");

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage(ValidationMessageHelper.ForNotEmpty(nameof(ContactFormRequestModel.LastName)))
                .MinimumLength(2).WithMessage("'{PropertyName}' must have a minimum of 2 charaters")
                .MaximumLength(20).WithMessage("'{PropertyName}' must have a maximum of 20 charaters")
                .Matches(_alphaNumericPattern).WithMessage("'{PropertyName}' must only contain alphanumeric charaters (a-z, A-Z, 0-9)");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage(ValidationMessageHelper.ForNotEmpty(nameof(ContactFormRequestModel.Email)))
                .MaximumLength(320).WithMessage("'{PropertyName}' must have a maximum of 320 charaters")
                .Matches(_emailPattern).WithMessage("'{PropertyName}' must only contain a valid email pattern");

            RuleFor(x => x.Subject)
                .NotEmpty().WithMessage(ValidationMessageHelper.ForNotEmpty(nameof(ContactFormRequestModel.Subject)))
                .MinimumLength(2).WithMessage("'{PropertyName}' must have a minimum of 2 charaters")
                .MaximumLength(100).WithMessage("'{PropertyName}' must have a maximum of 100 charaters")
                .Matches(_alphaNumericWithSpecialCharPattern).WithMessage("'{PropertyName}' must only contain alphanumeric charaters and a limited set of special charaters");

            RuleFor(x => x.Message)
                .NotEmpty().WithMessage(ValidationMessageHelper.ForNotEmpty(nameof(ContactFormRequestModel.Message)))
                .MinimumLength(10).WithMessage("'{PropertyName}' must have a minimum of 2 charaters")
                .Matches(_alphaNumericWithSpecialCharPattern).WithMessage("'{PropertyName}' must only contain alphanumeric charaters and a limited set of special charaters");
        }
    }
}
