import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormValidationMessageService } from '@core/services/form-validation-message.service';
import { HttpService } from '@core/services/http.service';
import { Observable } from 'rxjs';
import { ContactForm, ContactFormRequest, FormField } from '../models/contact-form.model';
import { ContactFormFieldsService } from './contact-form-fields.service';

@Injectable()
export class ContactFormService {

    constructor(
        private _formBuilder: FormBuilder,
        private _contactFormFieldsService: ContactFormFieldsService,
        private _httpService: HttpService,
        private _messageService: FormValidationMessageService) { }

    private formFields: ContactForm;

    getForm(): FormGroup {
        this.formFields = this._contactFormFieldsService.get();

        return this._formBuilder.group({
            firstName: [this.formFields.firstName.defaultValues, Validators.compose(this.formFields.firstName.validators)],
            lastName: [this.formFields.lastName.defaultValues, Validators.compose(this.formFields.lastName.validators)],
            email: [this.formFields.email.defaultValues, Validators.compose(this.formFields.email.validators)],
            subject: [this.formFields.subject.defaultValues, Validators.compose(this.formFields.subject.validators)],
            message: [this.formFields.message.defaultValues, Validators.compose(this.formFields.message.validators)]
        });
    }

    getErrorMessage(form: FormGroup, fieldName: string): string {
        const formField = form.get(fieldName);
        if (!formField.errors){
            return '';
        }

        const fieldType = this._contactFormFieldsService.fieldType(fieldName);
        const fieldDefinition = this.getProperty<ContactForm, keyof ContactForm>(this._contactFormFieldsService.get(), fieldType) as FormField;
        const formFieldErrors = Object.keys(formField.errors);

        const message = fieldDefinition.errorMessageList[formFieldErrors[0]];
        return message;
    }

    // tasks:
    // add loading symbol to form
    // restrict sendgrid api key to email only
    submit(contactFormRequest: ContactFormRequest): Observable<boolean> {
        return this._httpService.post('contact', contactFormRequest);
    }

    // https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
    private getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
        return o[propertyName];
    }
}
