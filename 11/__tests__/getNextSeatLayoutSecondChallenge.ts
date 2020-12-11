import { getNextSeatLayoutSecondChallenge } from '../helpers';

describe('getNextSeatLayoutSecondChallenge', () => {
  it('works for the first given example', () => {
    const result = getNextSeatLayoutSecondChallenge([
      ['L', '.', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L'],
      ['L', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L'],
      ['L', '.', 'L', '.', 'L', '.', '.', 'L', '.', '.'],
      ['L', 'L', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L'],
      ['L', '.', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L'],
      ['L', '.', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L'],
      ['.', '.', 'L', '.', 'L', '.', '.', '.', '.', '.'],
      ['L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L'],
      ['L', '.', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L'],
      ['L', '.', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L'],
    ]);

    expect(result).toEqual([
      ['#', '.', '#', '#', '.', '#', '#', '.', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '.', '#', '#'],
      ['#', '.', '#', '.', '#', '.', '.', '#', '.', '.'],
      ['#', '#', '#', '#', '.', '#', '#', '.', '#', '#'],
      ['#', '.', '#', '#', '.', '#', '#', '.', '#', '#'],
      ['#', '.', '#', '#', '#', '#', '#', '.', '#', '#'],
      ['.', '.', '#', '.', '#', '.', '.', '.', '.', '.'],
      ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '.', '#', '#', '#', '#', '#', '#', '.', '#'],
      ['#', '.', '#', '#', '#', '#', '#', '.', '#', '#'],
    ]);
  });
  it('works for second given example', () => {
    const result = getNextSeatLayoutSecondChallenge([
      ['#', '.', '#', '#', '.', '#', '#', '.', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '.', '#', '#'],
      ['#', '.', '#', '.', '#', '.', '.', '#', '.', '.'],
      ['#', '#', '#', '#', '.', '#', '#', '.', '#', '#'],
      ['#', '.', '#', '#', '.', '#', '#', '.', '#', '#'],
      ['#', '.', '#', '#', '#', '#', '#', '.', '#', '#'],
      ['.', '.', '#', '.', '#', '.', '.', '.', '.', '.'],
      ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '.', '#', '#', '#', '#', '#', '#', '.', '#'],
      ['#', '.', '#', '#', '#', '#', '#', '.', '#', '#'],
    ]);
    expect(result).toEqual([
      ['#', '.', 'L', 'L', '.', 'L', 'L', '.', 'L', '#'],
      ['#', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L'],
      ['L', '.', 'L', '.', 'L', '.', '.', 'L', '.', '.'],
      ['L', 'L', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L'],
      ['L', '.', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L'],
      ['L', '.', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L'],
      ['.', '.', 'L', '.', 'L', '.', '.', '.', '.', '.'],
      ['L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', '#'],
      ['#', '.', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L'],
      ['#', '.', 'L', 'L', 'L', 'L', 'L', '.', 'L', '#'],
    ]);
  });
  it('works for third given example', () => {
    const result = getNextSeatLayoutSecondChallenge([
      ['#', '.', 'L', 'L', '.', 'L', 'L', '.', 'L', '#'],
      ['#', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L'],
      ['L', '.', 'L', '.', 'L', '.', '.', 'L', '.', '.'],
      ['L', 'L', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L'],
      ['L', '.', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L'],
      ['L', '.', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L'],
      ['.', '.', 'L', '.', 'L', '.', '.', '.', '.', '.'],
      ['L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', '#'],
      ['#', '.', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L'],
      ['#', '.', 'L', 'L', 'L', 'L', 'L', '.', 'L', '#'],
    ]);

    expect(result[0][3]).toEqual('#');

    expect(result).toEqual([
      ['#', '.', 'L', '#', '.', '#', '#', '.', 'L', '#'],
      ['#', 'L', '#', '#', '#', '#', '#', '.', 'L', 'L'],
      ['L', '.', '#', '.', '#', '.', '.', '#', '.', '.'],
      ['#', '#', 'L', '#', '.', '#', '#', '.', '#', '#'],
      ['#', '.', '#', '#', '.', '#', 'L', '.', '#', '#'],
      ['#', '.', '#', '#', '#', '#', '#', '.', '#', 'L'],
      ['.', '.', '#', '.', '#', '.', '.', '.', '.', '.'],
      ['L', 'L', 'L', '#', '#', '#', '#', 'L', 'L', '#'],
      ['#', '.', 'L', '#', '#', '#', '#', '#', '.', 'L'],
      ['#', '.', 'L', '#', '#', '#', '#', '.', 'L', '#'],
    ]);
  });
});
