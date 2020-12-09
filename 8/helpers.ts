import fs, { readFileSync } from 'fs';
import path, { format, parse } from 'path';
import { Instruction, Operation } from './types';

const MY_BAG_COLOR = 'shiny gold';

const data = readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const parseLine = (line: string): Instruction => {
  // "acc +1" => ['acc', 1];
  const parts = line.split(' ');

  return [parts[0] as Operation, parseInt(parts[1])];
};

export const getAccumulatorSum = (instructions: Instruction[]) => {
  let result = 0;

  const markedInstructions: boolean[] = instructions.map((i) => false);

  // find next instruction
  let instructionIndex = 0;
  // true means it has been finished
  while (markedInstructions[instructionIndex] !== true) {
    if (instructionIndex === instructions.length) {
      break;
    }
    // mark the currentInstruction as done
    markedInstructions[instructionIndex] = true;
    const [operation, number] = instructions[instructionIndex];
    if (operation === 'nop') {
      instructionIndex += 1;
    }
    if (operation === 'acc') {
      instructionIndex += 1;
      result += number;
    }
    if (operation === 'jmp') {
      instructionIndex += number;
    }
  }

  return result;
};

export const isValidInstructions = (instructions: Instruction[]): boolean => {
  let result = false;
  // can loop through and end up trying to execute instruction at index instructions.length
  const doneInstructions: boolean[] = instructions.map((i) => false);

  // find next instruction
  let instructionIndex = 0;
  // true means it has been finished
  while (doneInstructions[instructionIndex] !== true) {
    if (instructionIndex === instructions.length) {
      result = true;
      break;
    }
    // mark the currentInstruction as done
    doneInstructions[instructionIndex] = true;
    const [operation, number] = instructions[instructionIndex];
    if (operation === 'nop') {
      instructionIndex += 1;
    }
    if (operation === 'acc') {
      instructionIndex += 1;
    }
    if (operation === 'jmp') {
      instructionIndex += number;
    }
  }
  return result;
};

export const getPossibleCombinations = (
  instructions: Instruction[]
): Instruction[][] => {
  const possibleCombinations: Instruction[][] = [];

  instructions.forEach(([operation, number], i) => {
    if (operation === 'nop') {
      const newInstructions = [
        ...instructions.slice(0, i),
        ['jmp', number] as Instruction,
        ...instructions.slice(i + 1),
      ];

      possibleCombinations.push(newInstructions);
      return;
    }

    if (operation === 'jmp') {
      const newInstructions = [
        ...instructions.slice(0, i),
        ['nop', number] as Instruction,
        ...instructions.slice(i + 1),
      ];

      possibleCombinations.push(newInstructions);
      return;
    }
  });

  return possibleCombinations;
};

const formattedData: Instruction[] = data
  .split('\n')
  .filter((line) => line !== '')
  .map((line) => parseLine(line));

export const printAnswer1 = () => {
  const answer = getAccumulatorSum(formattedData);
  console.log(answer);
};

export const printAnswer2 = () => {
  const possibleCombinations = getPossibleCombinations(formattedData);
  const validInstructions = possibleCombinations.find((i) =>
    isValidInstructions(i)
  );
  const sum = getAccumulatorSum(validInstructions as Instruction[]);
  console.log(sum);
};
