import fs, { readFileSync } from 'fs';
import path, { parse } from 'path';

const MY_BAG_COLOR = 'shiny gold';

// 'light red bags contain 1 bright white bag, 2 muted yellow bags.'
// => {'light red': {'bright white': 1, 'muted yellow': 2}}
export const parseLine = (
  line: string
): { [key: string]: { [key: string]: number } } => {
  // rm full stop
  line = line.slice(0, line.length - 1);

  const parts = line.split('bags contain');
  const containingBagColor = parts[0].trim();
  const innerBagsStrings = parts[1].split(',').map((string) => string.trim()); // [ '1 bright white bag', '2 muted yellow bags' ]

  const innerBagsConfig = {} as { [key: string]: number };

  innerBagsStrings.forEach((string) => {
    try {
      const requiredInfo = string.split('bag')[0];

      const bagColor = requiredInfo
        .match(/[a-z\s]/g)
        ?.join('')
        .trim();

      const numberString = requiredInfo.match(/[0-9]/g)?.join('');
      const number = numberString ? parseInt(numberString, 10) : undefined;

      // handle when requiredInfo string is "contain no other bags", where there is no number present
      if (number) {
        innerBagsConfig[bagColor as string] = number;
      }
      return;
    } catch (e) {
      console.log(`Parsing failed for ${string} in ${line}`);
    }
  });

  return {
    [containingBagColor]: innerBagsConfig,
  };
};

export const canContainBag = (
  bagColorToFind: string,
  bagToLookIn: string,
  bagCombinationsConfig: {
    [key: string]: { [key: string]: number };
  }
): boolean => {
  const currentBagContents = Object.keys(bagCombinationsConfig[bagToLookIn]);

  if (currentBagContents.length === 0) {
    return false;
  }
  if (currentBagContents.includes(bagColorToFind)) {
    return true;
  }

  const isContainedInInnerBag = currentBagContents.reduce((acc, innerBag) => {
    return canContainBag(bagColorToFind, innerBag, bagCombinationsConfig);
  }, false);

  return isContainedInInnerBag;
};

export const findPossibleOuterBags = (
  bagColorToFind: string,
  bagCombinationsConfig: {
    [key: string]: { [key: string]: number };
  }
): string[] => {
  const allBags = Object.keys(bagCombinationsConfig);

  return allBags.filter((bag) =>
    canContainBag(bagColorToFind, bag, bagCombinationsConfig)
  );
};

export const getNumberOfTotalBags = (
  topBagColor: string,
  bagCombinationsConfig: {
    [key: string]: { [key: string]: number };
  }
): number => {
  let total = 0;

  const contents = bagCombinationsConfig[topBagColor];
  Object.entries(contents).forEach(([type, count]) => {
    total += count;
    total += getNumberOfTotalBags(type, bagCombinationsConfig) * count;
  });

  return total;
};

const data = readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const formattedData: { [key: string]: { [key: string]: number } } = data
  .split('\n')
  .filter((line) => line !== '')
  .map((line) => parseLine(line))
  .reduce((acc, parsedLine) => ({ ...acc, ...parsedLine }), {});

export const printAnswer1 = () => {
  const answer = findPossibleOuterBags(MY_BAG_COLOR, formattedData);

  console.log(answer.length);
};

export const printAnswer2 = () => {
  const answer = getNumberOfTotalBags(MY_BAG_COLOR, formattedData);

  console.log(answer);
};
