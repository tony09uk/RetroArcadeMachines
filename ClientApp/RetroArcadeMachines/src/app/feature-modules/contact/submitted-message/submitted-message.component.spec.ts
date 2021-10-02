import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedMessageComponent } from './submitted-message.component';

describe('SubmittedMessageComponent', () => {
  let component: SubmittedMessageComponent;
  let fixture: ComponentFixture<SubmittedMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittedMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
