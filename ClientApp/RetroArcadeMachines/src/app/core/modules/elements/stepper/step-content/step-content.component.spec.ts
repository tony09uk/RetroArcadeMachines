import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepContentComponent } from './step-content.component';

describe('StepContentComponent', () => {
  let component: StepContentComponent<any>;
  let fixture: ComponentFixture<StepContentComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
