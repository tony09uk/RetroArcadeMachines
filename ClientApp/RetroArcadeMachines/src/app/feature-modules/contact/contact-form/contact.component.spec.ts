import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';

import { ElementsModule } from '@core/modules/elements/elements.module';
import { FormModule } from '@core/modules/form/form.module';
import { LoadingModule } from '@core/modules/loading/loading.module';
import { AlertService } from '@core/services/alert.service';
import { HttpService } from '@core/services/http.service';

import { ContactFormService } from '../services/contact-form.service';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let contactFormService: ContactFormService;
  let httpServiceSpyObj: jasmine.SpyObj<HttpService>;
  let alertServiceSpyObj: jasmine.SpyObj<AlertService>;

  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    alertServiceSpyObj = jasmine.createSpyObj<AlertService>('AlertService', [
      'error'
    ]);

    httpServiceSpyObj = jasmine.createSpyObj<HttpService>('HttpService', [
      'post'
    ]);
    httpServiceSpyObj.post.and.returnValue(of(true));

    const fg: FormGroup = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      subject: new FormControl(''),
      message: new FormControl(''),
    });

    const fgd: FormGroupDirective = new FormGroupDirective([], []);
    fgd.form = fg;

    await TestBed.configureTestingModule({
      imports: [
        ElementsModule,
        LoadingModule,
        FormModule,
        BrowserAnimationsModule
      ],
      providers: [
        FormBuilder,
        ContactFormService,
        { provide: ControlContainer, useValue: fgd },
        { provide: AlertService, useValue: alertServiceSpyObj },
        { provide: HttpService, useValue: httpServiceSpyObj },
      ],
      declarations: [ContactComponent]
    }).compileComponents();

    contactFormService = TestBed.inject(ContactFormService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set the form', () => {
      expect(component.form).toBeTruthy();
    });

    it('should set the firstname control', () => {
      expect(component.firstName).toBeInstanceOf(AbstractControl);
    });

    it('should set the lastname control', () => {
      expect(component.lastName).toBeInstanceOf(AbstractControl);
    });

    it('should set the email control', () => {
      expect(component.email).toBeInstanceOf(AbstractControl);
    });

    it('should set the subject control', () => {
      expect(component.subject).toBeInstanceOf(AbstractControl);
    });

    it('should set the message control', () => {
      expect(component.message).toBeInstanceOf(AbstractControl);
    });

    it('should set firstNameErrorMessages', () => {
      expect(component.firstNameErrorMessages.required).toBeTruthy();
      expect(component.firstNameErrorMessages.minlength).toBeTruthy();
      expect(component.firstNameErrorMessages.maxlength).toBeTruthy();
      expect(component.firstNameErrorMessages.pattern).toBeTruthy();
    });

    it('should set lastNameErrorMessages', () => {
      expect(component.lastNameErrorMessages.required).toBeTruthy();
      expect(component.lastNameErrorMessages.minlength).toBeTruthy();
      expect(component.lastNameErrorMessages.maxlength).toBeTruthy();
      expect(component.lastNameErrorMessages.pattern).toBeTruthy();
    });

    it('should set emailErrorMessages', () => {
      expect(component.emailErrorMessages.required).toBeTruthy();
      expect(component.emailErrorMessages.maxlength).toBeTruthy();
      expect(component.emailErrorMessages.pattern).toBeTruthy();
    });

    it('should set subjectErrorMessages', () => {
      expect(component.subjectErrorMessages.required).toBeTruthy();
      expect(component.subjectErrorMessages.minlength).toBeTruthy();
      expect(component.subjectErrorMessages.maxlength).toBeTruthy();
      expect(component.subjectErrorMessages.pattern).toBeTruthy();
    });

    it('should set messageErrorMessages', () => {
      expect(component.messageErrorMessages.required).toBeTruthy();
      expect(component.messageErrorMessages.minlength).toBeTruthy();
      expect(component.messageErrorMessages.maxlength).toBeTruthy();
      expect(component.messageErrorMessages.pattern).toBeTruthy();
    });
  });

  describe('onSubmit', () => {
    it('should call submit', () => {
      spyOn(ContactFormService.prototype, 'submit').and.returnValue(of(true));

      component.onSubmit();

      expect(contactFormService.submit).toHaveBeenCalledTimes(1);
    });

    it('should mark submission as success on successful response', () => {
      spyOn(ContactFormService.prototype, 'submit').and.returnValue(of(true));

      component.onSubmit();

      expect(component.isFormSubmissionSuccessful).toEqual(true);
    });
  });
});
