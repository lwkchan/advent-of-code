import { getNumberOfTotalBags } from '../helpers';

describe('getNumberOfTotalBags', () => {
  it('returns the correct answer', () => {
    const bagCombinationsConfig = {
      'light red': { 'bright white': 1, 'muted yellow': 2 },
      'dark orange': { 'bright white': 3, 'muted yellow': 4 },
      'bright white': { 'shiny gold': 1 },
      'muted yellow': { 'shiny gold': 2, 'faded blue': 9 },
      'shiny gold': { 'dark olive': 1, 'vibrant plum': 2 },
      'dark olive': { 'faded blue': 3, 'dotted black': 4 },
      'vibrant plum': { 'faded blue': 5, 'dotted black': 6 },
      'faded blue': {},
      'dotted black': {},
    };

    const outerBag = 'shiny gold';

    expect(getNumberOfTotalBags(outerBag, bagCombinationsConfig)).toEqual(32);
  });
  it('returns the correct answer', () => {
    const bagCombinationsConfig = {
      'shiny gold': { 'dark red': 2 },
      'dark red': { 'dark orange': 2 },
      'dark orange': { 'dark yellow': 2 },
      'dark yellow': { 'dark green': 2 },
      'dark green': { 'dark blue': 2 },
      'dark blue': { 'dark violet': 2 },
      'dark violet': {},
    };

    const outerBag = 'shiny gold';

    expect(getNumberOfTotalBags(outerBag, bagCombinationsConfig)).toEqual(126);
  });
});
