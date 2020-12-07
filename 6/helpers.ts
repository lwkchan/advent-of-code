import fs, { readFileSync } from 'fs';
import path from 'path';

export const formatData = (data: string): string[][] => {
  const result: string[][] = [];
  let currentGroup: string[] = [];

  const lines = data.split('\n');

  lines.forEach((individualAnswers, i) => {
    if (individualAnswers.length === 0) {
      result.push(currentGroup);
      currentGroup = [];
      return;
    }
    currentGroup.push(individualAnswers);

    // handle if last line is not blank
    if (i === lines.length - 1) {
      result.push(currentGroup);
    }
  });

  return result;
};

// where we find how many times each group answered yes to a single question
const calculateGroupAnswers = (
  groupAnswer: string[]
): { [key: string]: number } => {
  const countedGroupAnswers: { [key: string]: number } = groupAnswer
    .join('')
    .split('')
    .reduce((acc, letter) => {
      if (acc[letter]) {
        acc[letter] += 1;
      }

      if (!acc[letter]) {
        acc[letter] = 1;
      }

      return acc;
    }, {} as { [key: string]: number });

  return countedGroupAnswers;
};

// for part 1
export const countYesAnswersPerGroup = (groupAnswers: string[][]): number => {
  let result = 0;

  groupAnswers.forEach((groupAnswer) => {
    // answers become an array of individual letters, resulting in an object like {a: 1}
    const countedGroupAnswers: {
      [key: string]: number;
    } = calculateGroupAnswers(groupAnswer);

    // then we count how many times each letter occurs
    result += Object.keys(countedGroupAnswers).length;
  });

  return result;
};

export const countAgreedYesAnswersPerGroup = (
  allGroupsAnswers: string[][]
): number => {
  let result = 0;

  allGroupsAnswers.forEach((groupAnswer) => {
    // we look at how big the group is
    const groupSize = groupAnswer.length;

    const countedGroupAnswers = calculateGroupAnswers(groupAnswer);

    // then, for each key in the countedGroupAnswers, we count how many times the number of times answered yes === groupSize
    const answerKeys = Object.keys(countedGroupAnswers);
    answerKeys.forEach((key) => {
      if (countedGroupAnswers[key] === groupSize) {
        result += 1;
      }
    });
  });

  return result;
};

const data = readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const formattedData = formatData(data);

export const printAnswer1 = () => {
  const numberOfYesAnswers = countYesAnswersPerGroup(formattedData);
  console.log(`Groups answered yes to ${numberOfYesAnswers} questions`);
};

export const printAnswer2 = () => {
  const numberOfAgreedAnswers = countAgreedYesAnswersPerGroup(formattedData);

  console.log(`Groups agreed on ${numberOfAgreedAnswers} questions`);
};
