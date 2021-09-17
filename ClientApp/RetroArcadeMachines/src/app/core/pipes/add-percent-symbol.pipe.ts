import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'addPercentSymbol'
})
export class AddPercentSymbolPipe implements PipeTransform {
    transform(value: number, ...args: unknown[]): string {
        return value + '%';
    }
}
