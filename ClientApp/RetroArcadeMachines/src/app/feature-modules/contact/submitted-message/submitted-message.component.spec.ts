import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementsModule } from '@core/modules/elements/elements.module';

import { SubmittedMessageComponent } from './submitted-message.component';

describe('SubmittedMessageComponent', () => {
  let component: SubmittedMessageComponent;
  let fixture: ComponentFixture<SubmittedMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementsModule],
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
