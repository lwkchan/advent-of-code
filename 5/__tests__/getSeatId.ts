import { getSeatId } from '..';

describe('getSeatId', () => {
  it('returns the correct seat IDs', () => {
    expect(getSeatId('FBFBBFFRLR')).toEqual(357);
    expect(getSeatId('BFFFBBFRRR')).toEqual(567);
    expect(getSeatId('FFFBBBFRRR')).toEqual(119);
    expect(getSeatId('BBFFBBFRLL')).toEqual(820);
  });
});
