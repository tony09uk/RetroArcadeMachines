import { Component, forwardRef, Input } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseinputDirective } from '../baseinput.directive';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TextareaComponent)
    }
  ]
})
export class TextareaComponent extends BaseinputDirective {

  @Input() maxValueLength: number = 1000;
  @Input() autoResizeMin: number = 1;
  @Input() autoResizeMax: number = 15;

  constructor(controlContainer: ControlContainer) {
    super(controlContainer);
   }
}
