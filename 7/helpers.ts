import fs, { readFileSync } from 'fs';
import path from 'path';

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
      const number = parseInt(numberString as string, 10);

      innerBagsConfig[bagColor as string] = number;
    } catch (e) {
      console.log(`Parsing failed for ${string} in ${line}`);
    }
  });

  return {
    [containingBagColor]: innerBagsConfig,
  };
};

const data = readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

export const printAnswer1 = () => {};

export const printAnswer2 = () => {};
