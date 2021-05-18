import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const isTrue = (value === 'true');
    return isTrue ? 'Yes' : 'No';
  }
}
