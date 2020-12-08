import { getAccumulatorSum } from '../helpers';
import { Instruction } from '../types';

describe('getAccumulatorSum', () => {
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

    expect(getAccumulatorSum(input)).toEqual(5);
  });
});
