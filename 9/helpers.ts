import fs, { readFileSync } from 'fs';
import path, { format, parse } from 'path';

const MY_BAG_COLOR = 'shiny gold';

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
  // find two numbers which sum to 104054607
};
