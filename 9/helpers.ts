import { readFileSync } from 'fs';
import path from 'path';

const data = readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const canTargetSumFromArray = (
  targetNumber: number,
  array: number[]
): boolean => {
  let result = false;
  const sortedArray = array.sort((a, b) => a - b); // sort array small to big

  let firstValueIndex = 0;
  let secondValueIndex = array.length - 1;

  while (sortedArray[firstValueIndex] !== sortedArray[secondValueIndex]) {
    let currentSum =
      sortedArray[firstValueIndex] + sortedArray[secondValueIndex];

    if (currentSum === targetNumber) {
      result = true;
      break;
    }

    if (currentSum > targetNumber) {
      secondValueIndex -= 1;
    }

    if (currentSum < targetNumber) {
      firstValueIndex += 1;
    }
  }

  return result;
};

const findSequenceWhichSumsToTarget = (
  sequence: number[],
  target: number
): number[] => {
  // start at the bottom;
  // collect numbers from below first to create a sequence of 2 or more
  // for each sequence, get the sum
  // if the sum === target, then break and that's the result
  // if the sum < target, move the upper index +1
  // if the sum > target, remove the bottom number from the sequence;

  let bottomIndex = 0;
  let topIndex = 1;
  let currentSequenceSum = 0;

  while (currentSequenceSum !== target) {
    currentSequenceSum = sequence
      .slice(bottomIndex, topIndex + 1)
      .reduce((a, b) => a + b, 0);

    if (currentSequenceSum < target) {
      topIndex += 1;
    }

    if (currentSequenceSum > target) {
      bottomIndex += 1;
    }
  }

  return sequence.slice(bottomIndex, topIndex + 1);
};

const numbersData: number[] = data
  .split('\n')
  .filter((line) => line !== '')
  .map((line) => parseInt(line));

export const printAnswer1 = () => {
  const firstInvalidNumber = numbersData
    .slice(25)
    .find(
      (number, i) =>
        !canTargetSumFromArray(number, numbersData.slice(i, i + 25))
    );

  console.log(firstInvalidNumber);
};

export const printAnswer2 = () => {
  const target = 104054607;

  const sequenceWhichSumsToTarget = findSequenceWhichSumsToTarget(
    numbersData,
    target
  );

  const [min, max] = [
    Math.min(...sequenceWhichSumsToTarget),
    Math.max(...sequenceWhichSumsToTarget),
  ];

  console.log(min + max);
};
