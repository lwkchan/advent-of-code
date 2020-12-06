import { countAgreedYesAnswersPerGroup } from '../helpers';

describe('countAgreedYesAnswersPerGroup', () => {
  it('counts the total number of questions answered "Yes" by all groups', () => {
    const input = [
      ['abc'],
      ['a', 'b', 'c'],
      ['ab', 'ac'],
      ['a', 'a', 'a', 'a'],
      ['b'],
    ];

    expect(countAgreedYesAnswersPerGroup(input)).toEqual(6);
  });
});
