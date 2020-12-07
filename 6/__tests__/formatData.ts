import { formatData } from '../helpers';

describe('formatData', () => {
  it('formats the data correctly', () => {
    const input = 'abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb\n';

    expect(formatData(input)).toEqual([
      ['abc'],
      ['a', 'b', 'c'],
      ['ab', 'ac'],
      ['a', 'a', 'a', 'a'],
      ['b'],
    ]);
  });
  it('can handle when the last line is not blank', () => {
    const input = 'abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb';

    expect(formatData(input)).toEqual([
      ['abc'],
      ['a', 'b', 'c'],
      ['ab', 'ac'],
      ['a', 'a', 'a', 'a'],
      ['b'],
    ]);
  });
});
