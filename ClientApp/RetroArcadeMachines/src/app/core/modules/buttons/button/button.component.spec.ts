import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when button clicked', () => {
    const button: HTMLInputElement = fixture.debugElement.query(By.css('button')).nativeElement;
    component.clicked.subscribe(() => { expect(true).toBeTruthy(); });
    button.click();
  });

  it('should display properties set', () => {
    component.text = 'test';
    component.isDisabled = true;
    const button: HTMLInputElement = fixture.debugElement.query(By.css('button')).nativeElement;

    fixture.detectChanges();

    expect(button.textContent.trim()).toBe(component.text);
    expect(button.disabled).toBe(component.isDisabled);
  });
});
