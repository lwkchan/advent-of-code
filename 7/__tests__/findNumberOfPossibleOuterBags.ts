import { findPossibleOuterBags } from '../helpers';

describe('findPossibleOuterBags', () => {
  it('correctly finds the possible number of outer bags for the provided example', () => {
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

    const bagToFind = 'shiny gold';

    expect(
      findPossibleOuterBags(bagToFind, bagCombinationsConfig)
    ).toHaveProperty('length', 4);
  });
});
