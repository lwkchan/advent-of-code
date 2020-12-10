import { readFileSync } from 'fs';
import path from 'path';

const data = readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const adaptersInBag: number[] = data
  .split('\n')
  .filter((line) => line !== '')
  .map((line) => parseInt(line));

const findDifferences = (sequence: number[], difference: number): number => {
  let result = 0;
  for (let i = 0; i <= sequence.length; i++) {
    // if the current is greater than the last one by the difference, then result ++;
    if (sequence[i - 1] + difference === sequence[i]) {
      result += 1;
    }
  }
  return result;
};

const getNumberOfPossibleArrangements = (adapters: number[]): number => {
  const sorted = adapters.sort((a, b) => a - b); // sort small to big
  const possiblePathsTo: { [key: number]: number } = { 0: 1 };

  for (let i = 0; i < sorted.length; i++) {
    // we first check the immediate next number in the sequence
    let next = i + 1;
    // check diffs for up to three
    while (sorted[next] <= sorted[i] + 3) {
      const pathsToCurrent = possiblePathsTo[i];
      if (i === 1) {
        // if undefined so far, we add 0 because it means that we _can_ somehow get to the next number with the previous numbers
        // if we already have a number defined, we add pathsToCurrent because we are saying there are now x^numberOfPossiblePaths
        possiblePathsTo[next] = (possiblePathsTo[next] || 0) + pathsToCurrent;
        next += 1; // increment to the next index
      }
    }
  }
  // get possible ways until last step
  return possiblePathsTo[adapters.length - 1];
};

export const printAnswer1 = () => {
  const highestAdapter = Math.max(...adaptersInBag) + 3;
  // 0 is starting jolt
  const adapterSequence = [0, ...adaptersInBag, highestAdapter].sort(
    (a, b) => a - b
  );

  // count differences
  const [oneDifferences, threeDifferences] = [
    findDifferences(adapterSequence, 1),
    findDifferences(adapterSequence, 3),
  ];

  console.log(oneDifferences * threeDifferences);
};

export const printAnswer2 = () => {
  const highestAdapter = Math.max(...adaptersInBag) + 3;
  const totalAdapters = [0, ...adaptersInBag, highestAdapter];
  const a = getNumberOfPossibleArrangements(totalAdapters);

  console.log(a);
};
