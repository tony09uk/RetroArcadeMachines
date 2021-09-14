import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ContactFormRequest } from './models/contact-form.model';
import { ContactFormFieldsService } from './services/contact-form-fields.service';
import { ContactFormService } from './services/contact-form.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ ContactFormService ]
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  isSaving: boolean = false;
  firstName: AbstractControl;
  lastName: AbstractControl;
  email: AbstractControl;
  subject: AbstractControl;
  message: AbstractControl;

  constructor(private _contactFormService: ContactFormService) { }

  ngOnInit(): void {
    this.form = this._contactFormService.getForm();
    this.firstName = this.form.get(ContactFormFieldsService.firstName);
    this.lastName = this.form.get(ContactFormFieldsService.lastName);
    this.email = this.form.get(ContactFormFieldsService.email);
    this.subject = this.form.get(ContactFormFieldsService.subject);
    this.message = this.form.get(ContactFormFieldsService.message);
  }

  onSubmit(): void {
    this.isSaving = true;
    this._contactFormService
      .submit(this.form.value as ContactFormRequest)
      .subscribe(
        (response: boolean) => { console.log('Trigger sent message'); },
        (error: HttpErrorResponse) => { console.log('Show toastr'); }
      );
  }

  getErrorMessage(fieldName: string): string {
    return 'test';
  }

}
