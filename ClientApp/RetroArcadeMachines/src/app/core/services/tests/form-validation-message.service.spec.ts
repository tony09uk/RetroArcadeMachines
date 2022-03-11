import { TestBed } from '@angular/core/testing';
import { FormValidationMessageService } from '../form-validation-message.service';

describe('FormValidationMessageService', () => {
    let sut: FormValidationMessageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FormValidationMessageService
            ]
        });

        sut = TestBed.inject(FormValidationMessageService);
    });

    it('should get required field validation message', () => {
        const message = sut.required('testName');
        expect(message).toEqual('testName is required');
    });

    it('should get minLength field validation message', () => {
        const message = sut.minLength('testName', 5);
        expect(message).toEqual('testName must have at least 5 charaters');
    });

    it('should get maxLength field validation message', () => {
        const message = sut.maxLength('testName', 5);
        expect(message).toEqual('a maximum of 5 charaters is allowed for testName');
    });

    it('should get pattern field validation message', () => {
        const message = sut.pattern('testName');
        expect(message).toEqual('you have a used an invalid charater in testName');
    });
});
