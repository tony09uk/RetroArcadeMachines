import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationMessageService } from '@core/services/form-validation-message.service';

// todo: refactor forms. Form code not reusable at this time but could be.
// todo: make forms strongly typed
@Injectable()
export class AssignGamesFormService {

    constructor(
        private _formBuilder: FormBuilder,
        private _messageService: FormValidationMessageService) { }

    get(): FormGroup {
        return this._formBuilder.group({
            category: [''],
            title: ['']
        });
    }

    get errorMessageListForCategory(): any {
        return {
            required: this._messageService.required('Category'),
        };
    }

    get errorMessageListForTitle(): any {
        return {
            required: this._messageService.required('Title'),
        };
    }
}
