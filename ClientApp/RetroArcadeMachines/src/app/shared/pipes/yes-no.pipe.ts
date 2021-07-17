import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {
  transform(value: boolean, ...args: unknown[]): string {
    return value ? 'Yes' : 'No';
  }
}
