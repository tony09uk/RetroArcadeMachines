import { TestBed } from '@angular/core/testing';

import { FormValidationMessageService } from '@core/services/form-validation-message.service';
import { ContactFormFieldsService } from '../contact-form-fields.service';


describe('ContactFormFieldsService', () => {
    let sut: ContactFormFieldsService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                ContactFormFieldsService,
                FormValidationMessageService
            ]
        });

        sut = TestBed.inject(ContactFormFieldsService);
    });

    it('should create', () => {
        expect(sut).toBeTruthy();
    });

    describe('get', () => {
        it('should return firstname definition correctly', () => {
            const expected = sut.get();
            const validatorCount = Object.keys(expected.firstName.errorMessageList).length;
            expect(expected.firstName.name).toBe('firstName');
            expect(expected.firstName.friendlyName).toBe('First Name');
            expect(expected.firstName.defaultValues).toBe('');
            expect(expected.firstName.errorMessageList.required).toBeTruthy();
            expect(expected.firstName.errorMessageList.minlength).toBeTruthy();
            expect(expected.firstName.errorMessageList.maxlength).toBeTruthy();
            expect(expected.firstName.errorMessageList.pattern).toBeTruthy();
            expect(expected.firstName.validators.length).toEqual(validatorCount);
        });

        it('should return lastname definition correctly', () => {
            const expected = sut.get();
            const validatorCount = Object.keys(expected.lastName.errorMessageList).length;
            expect(expected.lastName.name).toBe('lastName');
            expect(expected.lastName.friendlyName).toBe('Last Name');
            expect(expected.lastName.defaultValues).toBe('');
            expect(expected.lastName.errorMessageList.required).toBeTruthy();
            expect(expected.lastName.errorMessageList.minlength).toBeTruthy();
            expect(expected.lastName.errorMessageList.maxlength).toBeTruthy();
            expect(expected.lastName.errorMessageList.pattern).toBeTruthy();
            expect(expected.lastName.validators.length).toEqual(validatorCount);
        });

        it('should return email definition correctly', () => {
            const expected = sut.get();
            const validatorCount = Object.keys(expected.email.errorMessageList).length;
            expect(expected.email.name).toBe('email');
            expect(expected.email.friendlyName).toBe('Email');
            expect(expected.email.defaultValues).toBe('');
            expect(expected.email.errorMessageList.required).toBeTruthy();
            expect(expected.email.errorMessageList.maxlength).toBeTruthy();
            expect(expected.email.errorMessageList.pattern).toBeTruthy();
            expect(expected.email.validators.length).toEqual(validatorCount);
        });

        it('should return subject definition correctly', () => {
            const expected = sut.get();
            const validatorCount = Object.keys(expected.subject.errorMessageList).length;
            expect(expected.subject.name).toBe('subject');
            expect(expected.subject.friendlyName).toBe('Subject');
            expect(expected.subject.defaultValues).toBe('');
            expect(expected.subject.errorMessageList.required).toBeTruthy();
            expect(expected.subject.errorMessageList.minlength).toBeTruthy();
            expect(expected.subject.errorMessageList.maxlength).toBeTruthy();
            expect(expected.subject.errorMessageList.pattern).toBeTruthy();
            expect(expected.subject.validators.length).toEqual(validatorCount);
        });

        it('should return message definition correctly', () => {
            const expected = sut.get();
            const validatorCount = Object.keys(expected.message.errorMessageList).length;
            expect(expected.message.name).toBe('message');
            expect(expected.message.friendlyName).toBe('Message');
            expect(expected.message.defaultValues).toBe('');
            expect(expected.message.errorMessageList.required).toBeTruthy();
            expect(expected.message.errorMessageList.minlength).toBeTruthy();
            expect(expected.message.errorMessageList.maxlength).toBeTruthy();
            expect(expected.message.errorMessageList.pattern).toBeTruthy();
            expect(expected.message.validators.length).toEqual(validatorCount);
        });
    });

    // describe('ngOnInit', () => {
    //     it('should set the form', () => {
    //         expect(component.form).toBeTruthy();
    //     });

    //     it('should set the firstname control', () => {
    //         expect(component.firstName).toBeInstanceOf(AbstractControl);
    //     });

    //     it('should set the lastname control', () => {
    //         expect(component.lastName).toBeInstanceOf(AbstractControl);
    //     });

    //     it('should set the email control', () => {
    //         expect(component.email).toBeInstanceOf(AbstractControl);
    //     });

    //     it('should set the subject control', () => {
    //         expect(component.subject).toBeInstanceOf(AbstractControl);
    //     });

    //     it('should set the message control', () => {
    //         expect(component.message).toBeInstanceOf(AbstractControl);
    //     });

    //     it('should set firstNameErrorMessages', () => {
    //         expect(component.firstNameErrorMessages.required).toBeTruthy();
    //         expect(component.firstNameErrorMessages.minlength).toBeTruthy();
    //         expect(component.firstNameErrorMessages.maxlength).toBeTruthy();
    //         expect(component.firstNameErrorMessages.pattern).toBeTruthy();
    //     });

    //     it('should set lastNameErrorMessages', () => {
    //         expect(component.lastNameErrorMessages.required).toBeTruthy();
    //         expect(component.lastNameErrorMessages.minlength).toBeTruthy();
    //         expect(component.lastNameErrorMessages.maxlength).toBeTruthy();
    //         expect(component.lastNameErrorMessages.pattern).toBeTruthy();
    //     });

    //     it('should set emailErrorMessages', () => {
    //         expect(component.emailErrorMessages.required).toBeTruthy();
    //         expect(component.emailErrorMessages.maxlength).toBeTruthy();
    //         expect(component.emailErrorMessages.pattern).toBeTruthy();
    //     });

    //     it('should set subjectErrorMessages', () => {
    //         expect(component.subjectErrorMessages.required).toBeTruthy();
    //         expect(component.subjectErrorMessages.minlength).toBeTruthy();
    //         expect(component.subjectErrorMessages.maxlength).toBeTruthy();
    //         expect(component.subjectErrorMessages.pattern).toBeTruthy();
    //     });

    //     it('should set messageErrorMessages', () => {
    //         expect(component.messageErrorMessages.required).toBeTruthy();
    //         expect(component.messageErrorMessages.minlength).toBeTruthy();
    //         expect(component.messageErrorMessages.maxlength).toBeTruthy();
    //         expect(component.messageErrorMessages.pattern).toBeTruthy();
    //     });
    // });

    // describe('onSubmit', () => {
    //     it('should call submit', () => {
    //         spyOn(ContactFormService.prototype, 'submit').and.returnValue(of(true));

    //         component.onSubmit();

    //         expect(contactFormService.submit).toHaveBeenCalledTimes(1);
    //     });

    //     it('should mark submission as success on successful response', () => {
    //         spyOn(ContactFormService.prototype, 'submit').and.returnValue(of(true));

    //         component.onSubmit();

    //         expect(component.isFormSubmissionSuccessful).toEqual(true);
    //     });
    // });
});
