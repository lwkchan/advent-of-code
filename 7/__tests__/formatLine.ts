import { parseLine } from '../helpers';

describe('parseLine', () => {
  it('parses a line from the input correctly', () => {
    const input =
      'light red bags contain 1 bright white bag, 2 muted yellow bags.';

    expect(parseLine(input)).toEqual({
      'light red': { 'bright white': 1, 'muted yellow': 2 },
    });
  });
  it('parses a line from the input correctly when a number contains more than one digit', () => {
    const input =
      'light red bags contain 13 bright white bag, 233 muted yellow bags.';

    expect(parseLine(input)).toEqual({
      'light red': { 'bright white': 13, 'muted yellow': 233 },
    });
  });
  it('parses a line from the input correctly when a bag cannot contain another bag', () => {
    const input = 'dotted black bags contain no other bags.';

    expect(parseLine(input)).toEqual({
      'dotted black': {},
    });
  });
});
