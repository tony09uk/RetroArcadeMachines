import { ValidatorFn } from '@angular/forms';
import { KeyValuePair } from 'src/app/shared/models/key-value-pair.model';

export interface ContactFormRequest {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
}

export interface ContactForm {
    firstName: FormField;
    lastName: FormField;
    email: FormField;
    subject: FormField;
    message: FormField;
}

// todo: move below to shared/models
export interface FormField {
    name: string;
    friendlyName: string;
    defaultValues: string;
    errorMessageList: { [key: string]: string };
    validators: ValidatorFn[];
}

export interface FormValidationDefaultMessage {
    required?: string;
    minLength?: string;
    maxLength?: string;
    pattern?: string;
}
