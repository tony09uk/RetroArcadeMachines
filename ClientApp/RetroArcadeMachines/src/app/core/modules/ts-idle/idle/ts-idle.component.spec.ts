import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogConfirmService } from '@core/modules/dialog/dialog-confirm/services/dialog-confirm.service';
import { of } from 'rxjs';
import { IdleWarningStates } from '../enums/idle-warning.states.enum';
import { IdleService } from '../services/idle.service';

import { TsIdleComponent } from './ts-idle.component';

describe('TsIdleComponent', () => {
  let component: TsIdleComponent;
  let fixture: ComponentFixture<TsIdleComponent>;

  beforeEach(async () => {
    const idleServiceSpy = jasmine.createSpyObj<IdleService>('IdleService', {
      startWatching: of(IdleWarningStates.PrimaryTimerStarted),
      idleStateChanged: of(IdleWarningStates.PrimaryTimerStarted),
      timerResetOccoured: of(true)
    });

    await TestBed.configureTestingModule({
      providers: [
        { provide: IdleService, useValue: idleServiceSpy },
        { provide: DialogConfirmService, useValue: { } }
      ],
      declarations: [ TsIdleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsIdleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
