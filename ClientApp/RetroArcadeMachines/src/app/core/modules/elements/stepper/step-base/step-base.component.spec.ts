import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepBaseComponent } from './step-base.component';

describe('StepBaseComponent', () => {
  let component: StepBaseComponent;
  let fixture: ComponentFixture<StepBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
