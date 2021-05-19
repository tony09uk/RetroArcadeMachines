import { YesNoPipe } from './yes-no.pipe';

describe('YesNoPipe', () => {
  it('should create an instance', () => {
    const pipe = new YesNoPipe();
    expect(pipe).toBeTruthy();
  });

  const transformScenarios = [
    { description: 'should return Yes when value is true', input: 'true', expected: 'Yes'},
    { description: 'should return No when value is false', input: 'false', expected: 'No'},
    { description: 'should return No when value is false', input: 'null', expected: 'No'},
    { description: 'should return No when value is false', input: 'undefined', expected: 'No'},
  ];
  transformScenarios.forEach(value => {
    it(value.description, () => {
      const pipe = new YesNoPipe();
      const result = pipe.transform(value.input);
      expect(result).toBe(value.expected);
    });
  });

});
