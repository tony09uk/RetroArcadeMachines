import {
  Directive,
  forwardRef,
  Input,
  ViewChild
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Directive({
  selector: '[appBaseinput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => BaseinputDirective)
    }
  ]
})
export class BaseinputDirective implements ControlValueAccessor {

  @ViewChild(FormControlDirective, {static: true}) formControlDirective: FormControlDirective;
  @Input() formControl: FormControl;
  @Input() formControlName: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() errorMessages: { [key: string]: string };

  get control(): FormControl {
    return this.formControl || this.controlContainer.control.get(this.formControlName) as FormControl;
  }

  // todo: check the parent is a form, if throw descriptive error
  constructor(private controlContainer: ControlContainer) { }

  clearInput(): void {
    this.control.setValue('');
  }

  getErrorMessage(): string {
    if (!this.control.errors) {
      return '';
    }
    const validationErrors = Object.keys(this.control.errors);
    return this.errorMessages[validationErrors[0]];
  }

  registerOnTouched(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnTouched(fn);
  }

  registerOnChange(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnChange(fn);
  }

  writeValue(obj: any): void {
    this.formControlDirective.valueAccessor.writeValue(obj);
  }

  setDisabledState(isDisabled: boolean): void {
    this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
  }
}
