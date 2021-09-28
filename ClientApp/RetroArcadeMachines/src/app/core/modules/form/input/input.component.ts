import { forwardRef } from '@angular/core';
import { Component } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseinputDirective } from '../baseinput.directive';

@Component({
  selector: 'app-input',
  templateUrl: 'input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent)
    }
  ]
})
export class InputComponent extends BaseinputDirective {

  constructor(controlContainer: ControlContainer) {
    super(controlContainer);
   }
}
