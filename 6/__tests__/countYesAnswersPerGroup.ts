import { countYesAnswersPerGroup } from '../helpers';

describe('countYesAnswersPerGroup', () => {
  it('counts the total number of questions answered "Yes" by all groups', () => {
    const input = [
      ['abc'],
      ['a', 'b', 'c'],
      ['ab', 'ac'],
      ['a', 'a', 'a', 'a'],
      ['b'],
    ];

    expect(countYesAnswersPerGroup(input)).toEqual(11);
  });
});
