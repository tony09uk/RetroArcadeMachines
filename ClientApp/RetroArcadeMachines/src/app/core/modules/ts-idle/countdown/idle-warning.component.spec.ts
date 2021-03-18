import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdleWarningComponent } from './idle-warning.component';

describe('IdleWarningComponent', () => {
  let component: IdleWarningComponent;
  let fixture: ComponentFixture<IdleWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdleWarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdleWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
