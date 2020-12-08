import { isValidInstructions } from '../helpers';
import { Instruction } from '../types';

describe('isValidInstructions', () => {
  it('returns true when the instructions are valid', () => {
    let input: Instruction[] = [
      ['nop', 0],
      ['acc', 1],
      ['jmp', 4],
      ['acc', 3],
      ['jmp', -3],
      ['acc', -99],
      ['acc', 1],
      ['nop', -4],
      ['acc', 6],
    ];

    expect(isValidInstructions(input)).toEqual(true);

    input = [['nop', 0]];
    expect(isValidInstructions(input)).toEqual(true);
  });
  it('returns false when the instructions are invalid', () => {
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

    expect(isValidInstructions(input)).toEqual(false);
  });
});
