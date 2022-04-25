using FluentValidation;
using RetroArcadeMachines.Shared.Models.Requests;
using static RetroArcadeMachines.Shared.Models.Validation.ContactFormRequestModelValidator;

namespace RetroArcadeMachines.Shared.Models.Validation
{
    public class LocationDetailsRequestModelValidator : BaseModelValidator<LocationDetailsRequestModel>
    {
        public LocationDetailsRequestModelValidator()
        {
            RuleFor(x => x.Lat)
                .NotNull().WithMessage(ValidationMessageHelper.ForNotNull(nameof(LocationDetailsRequestModel.Lat)));

            RuleFor(x => x.Lng)
                .NotNull().WithMessage(ValidationMessageHelper.ForNotNull(nameof(LocationDetailsRequestModel.Lng)));

            RuleFor(x => x.Address)
                .NotNull().WithMessage(ValidationMessageHelper.ForNotNull(nameof(LocationDetailsRequestModel.Address)));

            RuleFor(x => x.Address.LineOne)
                .MinimumLength(2).WithMessage("'{PropertyName}' must have a minimum of 2 charaters")
                .MaximumLength(100).WithMessage("'{PropertyName}' must have a maximum of 100 charaters")
                .Matches("[a-zA-Z0-9_.+-]").WithMessage("'{ PropertyName}' must only contain alphanumeric charaters (a-z, A-Z, 0-9)");

            RuleFor(x => x.Address.Country)
                .NotEmpty().WithMessage(ValidationMessageHelper.ForNotEmpty(nameof(LocationDetailsRequestModel.Address.Country)));

            RuleFor(x => x.AssignedGamesList)
                .NotNull().WithMessage(ValidationMessageHelper.ForNotNull(nameof(LocationDetailsRequestModel.AssignedGamesList)));
        }
    }
}
