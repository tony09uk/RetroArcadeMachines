import { ControlContainer } from '@angular/forms';
import { BaseinputDirective } from './baseinput.directive';

describe('BaseinputDirective', () => {
  it('should create an instance', () => {
    const directive = new BaseinputDirective({} as ControlContainer);
    expect(directive).toBeTruthy();
  });
});
