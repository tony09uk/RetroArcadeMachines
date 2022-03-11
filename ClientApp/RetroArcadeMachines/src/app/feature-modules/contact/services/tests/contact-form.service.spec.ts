import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '@core/services/http.service';
import { ContactFormRequest } from '../../models/contact-form.model';
import { ContactFormFieldsService } from '../contact-form-fields.service';
import { ContactFormService } from '../contact-form.service';

describe('ContactFormService', () => {
    let httpServiceSpyObj: jasmine.SpyObj<HttpService>;
    let sut: ContactFormService;

    beforeEach(() => {
        httpServiceSpyObj = jasmine.createSpyObj<HttpService>('HttpService', [
            'post'
        ]);

        TestBed.configureTestingModule({
            providers: [
                ContactFormService,
                FormBuilder,
                ContactFormFieldsService,
                { provide: HttpService, useValue: httpServiceSpyObj }
            ]
        });

        sut = TestBed.inject(ContactFormService);
    });

    it('should create', () => {
        expect(sut).toBeTruthy();
    });

    describe('getForm', () => {
        let actual: FormGroup;
        beforeEach(() => {
            actual = sut.getForm();
        });

        it('should return formGroup', () => {
            expect(actual).toBeTruthy();
        });

        it('should return firstName field in formGroup', () => {
            expect(actual.controls['firstName']).toBeTruthy();
        });

        it('should return lastName field in formGroup', () => {
            expect(actual.controls['lastName']).toBeTruthy();
        });

        it('should return email field in formGroup', () => {
            expect(actual.controls['email']).toBeTruthy();
        });

        it('should return subject field in formGroup', () => {
            expect(actual.controls['subject']).toBeTruthy();
        });

        it('should return message field in formGroup', () => {
            expect(actual.controls['message']).toBeTruthy();
        });
    });

    describe('getErrorMessages', () => {
        it('should return error messages for passed fieldName', () => {
            const actual = sut.getErrorMessages('firstName');
            const messageCount = Object.keys(actual).length;
            expect(messageCount).toEqual(4);
        });
    });

    describe('getErrorMessage', () => {
        let form: FormGroup;
        beforeEach(() => {
            form = sut.getForm();
        });

        it('should return empty string when passed fieldname has no errors', () => {
            form.controls['firstName'].setValue('testname');

            const actual = sut.getErrorMessage(form, 'firstName');

            expect(actual).toEqual('');
        });

        it('should get error message for passed fieldName', () => {
            const actual = sut.getErrorMessage(form, 'firstName');

            expect(actual).toEqual('First Name is required');
        });
    });

    describe('post', () => {
        it('should call httpservice post', () => {
            sut.submit({} as ContactFormRequest);
            expect(httpServiceSpyObj.post).toHaveBeenCalledTimes(1);
        });
    });
});
