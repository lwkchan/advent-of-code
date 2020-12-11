import { getVisibleOccupiedSeats } from '../helpers';

describe('getVisibleOccupiedSeats', () => {
  it('works with given example', () => {
    const result = getVisibleOccupiedSeats(
      [
        ['.', '.', '.', '.', '.', '.', '.', '#', '.'],
        ['.', '.', '.', '#', '.', '.', '.', '.', '.'],
        ['.', '#', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '#', 'L', '.', '.', '.', '.', '#'],
        ['.', '.', '.', '.', '#', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '#', '.', '.', '.', '.', '.'],
      ],
      4, // row
      3 // column
    );

    expect(result).toEqual(8);
  });
  it('works with second given example', () => {
    const result = getVisibleOccupiedSeats(
      [
        ['.', '#', '#', '.', '#', '#', '.'],
        ['#', '.', '#', '.', '#', '.', '#'],
        ['#', '#', '.', '.', '.', '#', '#'],
        ['.', '.', '.', 'L', '.', '.', '.'],
        ['#', '#', '.', '.', '.', '#', '#'],
        ['#', '.', '#', '.', '#', '.', '#'],
        ['.', '#', '#', '.', '#', '#', '.'],
      ],
      3, // row
      3 // column
    );

    expect(result).toEqual(0);
  });
  it('works with third given example', () => {
    const result = getVisibleOccupiedSeats(
      [
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', 'L', '.', 'L', '.', '#', '.', '#', '.', '#', '.', '#', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ],
      1,
      1
    );

    // The leftmost empty seat below would only see one empty seat, but cannot see any of the occupied ones:

    expect(result).toEqual(0);
  });
});
