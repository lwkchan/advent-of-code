import { getPossibleCombinations } from '../helpers';
import { Instruction } from '../types';

describe('getPossibleCombinations', () => {
  it('calculates the accumulator correctly from the set of instructions', () => {
    const input: Instruction[] = [
      ['nop', 0],
      ['acc', 1],
      ['jmp', 4],
      ['acc', 3],
      ['jmp', -3],
      ['acc', -99],
      ['acc', 1],
      ['jmp', -4],
      ['acc', 6],
    ];

    const result = getPossibleCombinations(input);

    expect(result[0]).toHaveProperty('length', input.length);
    expect(result[0]).toEqual([
      ['jmp', 0],
      ['acc', 1],
      ['jmp', 4],
      ['acc', 3],
      ['jmp', -3],
      ['acc', -99],
      ['acc', 1],
      ['jmp', -4],
      ['acc', 6],
    ]);
  });
});
