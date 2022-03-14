import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { ButtonsModule } from '@core/modules/buttons/buttons.module';
import { ElementsModule } from '@core/modules/elements/elements.module';

import { StepData } from '../../models/step-data.model';
import { AddService } from '../../services/add.service';

import { ConfirmComponent } from './confirm.component';

describe('ConfirmComponent', () => {
  let addServiceSpyObj: jasmine.SpyObj<AddService>;

  let component: ConfirmComponent;
  let fixture: ComponentFixture<ConfirmComponent>;

  beforeEach(async () => {
    addServiceSpyObj = jasmine.createSpyObj<AddService>('AddService', [
      'watchStepData'
    ]);
    addServiceSpyObj.watchStepData.and.returnValue(of({ } as StepData));

    await TestBed.configureTestingModule({
      imports: [
        ButtonsModule,
        ElementsModule
      ],
      declarations: [
        ConfirmComponent
      ]
    }).overrideComponent(ConfirmComponent,
      {
        set: {
          providers: [
            { provide: AddService, useValue: addServiceSpyObj }
          ]
        }
      }
    )
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set the message provide an address message', () => {
      addServiceSpyObj.watchStepData.and.returnValue(of({ } as StepData));

      fixture.detectChanges();

      expect(component.message).toBe('Please go back to Find Location and provide an address');
    });
  });
});
