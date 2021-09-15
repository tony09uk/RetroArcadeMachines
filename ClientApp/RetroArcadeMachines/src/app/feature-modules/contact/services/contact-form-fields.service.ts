import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import { FormValidationMessageService } from '@core/services/form-validation-message.service';
import { ContactForm } from '../models/contact-form.model';

@Injectable({
    providedIn: 'root'
})
export class ContactFormFieldsService {

    static get firstName(): string { return 'firstName'; }
    static get lastName(): string { return 'lastName'; }
    static get email(): string { return 'email'; }
    static get subject(): string { return 'subject'; }
    static get message(): string { return 'message'; }
    static get messageMaxLength(): number { return 1000; }

    get uiFieldNamefirstName(): string { return 'First Name'; }
    get uiFieldNameLastName(): string { return 'Last Name'; }
    get uiFieldNameEmail(): string { return 'Email'; }
    get uiFieldNameSubject(): string { return 'Subject'; }
    get uiFieldNameMessage(): string { return 'Message'; }

    constructor(private _messageService: FormValidationMessageService) { }

    private _emailPattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
    private _alphaNumericPattern = '^[a-zA-Z0-9]+$';
    private _alphaNumericWithSpecialCharPattern = '^[a-zA-Z0-9&"/\'\-_#$£ !%)(]+$';

    get(): ContactForm {
        return {
            firstName: {
                name: ContactFormFieldsService.firstName,
                friendlyName: this.uiFieldNamefirstName,
                defaultValues: '',
                errorMessageList: {
                    required: this._messageService.required(this.uiFieldNamefirstName),
                    minlength: this._messageService.minLength(this.uiFieldNamefirstName, 2),
                    maxlength: this._messageService.maxLength(this.uiFieldNamefirstName, 20),
                    pattern: this._messageService.pattern(this.uiFieldNamefirstName),
                },
                validators: [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(20),
                    Validators.pattern(this._alphaNumericPattern)
                ]
            },
            lastName: {
                name: ContactFormFieldsService.lastName,
                friendlyName: this.uiFieldNameLastName,
                defaultValues: '',
                errorMessageList: {
                    required: this._messageService.required(this.uiFieldNameLastName),
                    minlength: this._messageService.minLength(this.uiFieldNameLastName, 2),
                    maxlength: this._messageService.maxLength(this.uiFieldNameLastName, 20),
                    pattern: this._messageService.pattern(this.uiFieldNameLastName),
                },
                validators: [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(20),
                    Validators.pattern(this._alphaNumericPattern)
                ]
            },
            email: {
                name: ContactFormFieldsService.email,
                friendlyName: this.uiFieldNameEmail,
                defaultValues: '',
                errorMessageList: {
                    required: this._messageService.required(this.uiFieldNameEmail),
                    maxlength: this._messageService.maxLength(this.uiFieldNameEmail, 320),
                    pattern: this._messageService.pattern(this.uiFieldNameEmail),
                },
                validators: [
                    Validators.required,
                    Validators.maxLength(320),
                    Validators.pattern(this._emailPattern)
                ]
            },
            subject: {
                name: ContactFormFieldsService.subject,
                friendlyName: this.uiFieldNameSubject,
                defaultValues: '',
                errorMessageList: {
                    required: this._messageService.required(this.uiFieldNameSubject),
                    minlength: this._messageService.minLength(this.uiFieldNameSubject, 2),
                    maxlength: this._messageService.maxLength(this.uiFieldNameSubject, 100),
                    pattern: this._messageService.pattern(this.uiFieldNameSubject),
                },
                validators: [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(100),
                    Validators.pattern(this._alphaNumericWithSpecialCharPattern)
                ]
            },
            message: {
                name: ContactFormFieldsService.message,
                friendlyName: this.uiFieldNameMessage,
                defaultValues: '',
                errorMessageList: {
                    required: this._messageService.required(this.uiFieldNameMessage),
                    minlength: this._messageService.minLength(this.uiFieldNameMessage, 10),
                    maxlength: this._messageService.maxLength(this.uiFieldNameMessage, ContactFormFieldsService.messageMaxLength),
                    pattern: this._messageService.pattern(this.uiFieldNameMessage),
                },
                validators: [
                    Validators.required,
                    Validators.minLength(10),
                    Validators.maxLength(1000),
                    Validators.pattern(this._alphaNumericWithSpecialCharPattern)
                ]
            },
        };
    }

    fieldType(name: string): keyof ContactForm {
        const form = this.get();
        const formKeys = Object.keys(form);
        const key = formKeys.find(x => x === name);
        return key as keyof ContactForm;
    }
}
