import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { finalize, take } from 'rxjs/operators';

import { AlertService } from '@core/services/alert.service';

import { ContactFormRequest } from '../models/contact-form.model';
import { ContactFormFieldsService } from '../services/contact-form-fields.service';
import { ContactFormService } from '../services/contact-form.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ ContactFormService ]
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  isSaving: boolean = false;
  isFormSubmissionSuccessful: boolean = false;
  messageMaxLength: number = ContactFormFieldsService.messageMaxLength;
  get showForm(): boolean {
    if (this.isFormSubmissionSuccessful) {
      return false;
    }
    return !this.isFormSubmissionSuccessful && !this.isSaving;
  }

  firstName: AbstractControl;
  lastName: AbstractControl;
  email: AbstractControl;
  subject: AbstractControl;
  message: AbstractControl;

  firstNameErrorMessages: { [key: string]: string };
  lastNameErrorMessages: { [key: string]: string };
  emailErrorMessages: { [key: string]: string };
  subjectErrorMessages: { [key: string]: string };
  messageErrorMessages: { [key: string]: string };

  constructor(
    private _contactFormService: ContactFormService,
    private _alertService: AlertService) { }

  ngOnInit(): void {
    this.form = this._contactFormService.getForm();
    this.firstName = this.form.get(ContactFormFieldsService.firstName);
    this.lastName = this.form.get(ContactFormFieldsService.lastName);
    this.email = this.form.get(ContactFormFieldsService.email);
    this.subject = this.form.get(ContactFormFieldsService.subject);
    this.message = this.form.get(ContactFormFieldsService.message);

    this.firstNameErrorMessages = this._contactFormService.getErrorMessages(ContactFormFieldsService.firstName);
    this.lastNameErrorMessages = this._contactFormService.getErrorMessages(ContactFormFieldsService.lastName);
    this.emailErrorMessages = this._contactFormService.getErrorMessages(ContactFormFieldsService.email);
    this.subjectErrorMessages = this._contactFormService.getErrorMessages(ContactFormFieldsService.subject);
    this.messageErrorMessages = this._contactFormService.getErrorMessages(ContactFormFieldsService.message);
  }

  onSubmit(): void {
    this.isSaving = true;
    this._contactFormService
      .submit(this.form.value as ContactFormRequest)
      .pipe(
        take(1),
        finalize(() => this.isSaving = false)
      )
      .subscribe(
        (response: boolean) => { this.isFormSubmissionSuccessful = response; },
        (error: HttpErrorResponse) => { this._alertService.error('An unexpected error occurred'); }
      );
  }

  getErrorMessage(fieldName: string): string {
    return this._contactFormService.getErrorMessage(this.form, fieldName);
  }
}
