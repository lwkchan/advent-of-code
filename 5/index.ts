import fs, { readFileSync } from 'fs';
import path from 'path';
import { MAX_COLUMN, MAX_ROW } from './constants';
import { ColumnPartition, RowPartition, SeatCode } from './types';

const data = readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const formattedData = data.split('\n').filter((s) => s !== '') as SeatCode[];

// Every seat also has a unique seat ID:
// multiply the row by 8, then add the column
export const getSeatId = (seatCode: SeatCode): number => {
  const letters = seatCode.split('');

  const rowLetters = letters.slice(0, 7) as RowPartition[];
  const row = getNumberFromPartitions(rowLetters, 'F', MAX_ROW);

  const columnLetters = letters.slice(7) as ColumnPartition[];
  const column = getNumberFromPartitions(columnLetters, 'L', MAX_COLUMN);

  return row * 8 + column;
};

const getNumberFromPartitions = (
  letters: string[],
  lowerLetter: string,
  max: number,
  min?: number
): number => {
  const initialMin = min || 0;

  let isLastMax: boolean = true;
  let resultMin = initialMin;
  let resultMax = max;
  letters.forEach((letter, i) => {
    // if it's the last letter and it's the lower letter, return
    if (i === letters.length - 1 && letter === lowerLetter) {
      isLastMax = false;
      return;
    }

    if (letter === lowerLetter) {
      const centralPoint = Math.floor(resultMax - (resultMax - resultMin) / 2);
      resultMax = centralPoint;
      return;
    }

    const centralPoint = Math.ceil(resultMax - (resultMax - resultMin) / 2);
    resultMin = centralPoint;
  });

  return isLastMax ? resultMax : resultMin;
};

const printAnswer1 = () => {
  const seatIds = formattedData.map(getSeatId);
  const greatestSeatId = seatIds.sort((a, b) => {
    return b - a;
  })[0];
  console.log(`Highest seat ID: ${greatestSeatId}`);
};

const printAnswer2 = () => {
  const seatIds = formattedData.map(getSeatId);
  const sortedSeatIds = seatIds.sort((a, b) => {
    return a - b;
  });

  let mySeatId: number | undefined;

  for (
    let i = sortedSeatIds[0];
    i <= sortedSeatIds[sortedSeatIds.length - 1];
    i++
  ) {
    if (sortedSeatIds.indexOf(i) === -1) {
      mySeatId = i;
      break;
    }
  }

  console.log(`My seatId is ${mySeatId}`);
};

printAnswer1();
printAnswer2();
