import { AddPercentSymbolPipe } from '../add-percent-symbol.pipe';

describe('AddPercentSymbolPipe', () => {
    it('should add a percentage symbol', () => {
        const actual = new AddPercentSymbolPipe().transform(5);
        expect(actual).toEqual('5%');
    });
});
