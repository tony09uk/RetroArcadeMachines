using FluentValidation.TestHelper;
using RetroArcadeMachines.Shared.Models.Requests;
using Xunit;

namespace RetroArcadeMachines.Shared.Models.Validation.Tests
{
    public class ContactFormRequestModelValidatorTests
    {
        private readonly ContactFormRequestModelValidator _validator;

        public ContactFormRequestModelValidatorTests()
        {
            _validator = new ContactFormRequestModelValidator();
        }

        [Theory]
        [InlineData(null, null, null, null, null)]
        [InlineData("", "", "", "", "")]
        [InlineData(" ", " ", " ", " ", " ")]
        public void Given_Empty_Values_All_Fields_Return_Validation_Error(
            string firstName, string lastName, string email, string subject, string message)
        {
            var model = new ContactFormRequestModel
            {
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                Subject = subject,
                Message = message
            };

            var result = _validator.TestValidate(model);
            result.ShouldHaveValidationErrorFor(f => f.FirstName);
            result.ShouldHaveValidationErrorFor(f => f.LastName);
            result.ShouldHaveValidationErrorFor(f => f.Email);
            result.ShouldHaveValidationErrorFor(f => f.Subject);
            result.ShouldHaveValidationErrorFor(f => f.Message);
        }

        [Theory]
        [InlineData("missing-at-sign.com")]
        [InlineData("missing-domain@.com")]
        [InlineData("missing-tld@company")]
        [InlineData("@missing-username.net")]
        public void Given_Email_Invalid_Email_Field_Return_Validation_Error(string email)
        {
            var model = new ContactFormRequestModel
            {
                Email = email,
            };

            var result = _validator.TestValidate(model);
            result.ShouldHaveValidationErrorFor(f => f.Email);
        }

        // todo: test other scenarios
    }
}
