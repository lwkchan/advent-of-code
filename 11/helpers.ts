import { readFileSync } from 'fs';
import path from 'path';

// L empty,
// # Occupied
// . floor
type Seat = 'L' | '#' | '.';

const data = readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const getNumberOfSeat = (arrangement: Seat[][], seatType: Seat): number => {
  let result = 0;
  arrangement.forEach((row) => {
    row.forEach((seat) => {
      if (seat === seatType) {
        result += 1;
      }
    });
  });

  return result;
};

const getSurroundingSeats = (
  layout: Seat[][],
  rowIndex: number,
  columnIndex: number
): Seat[] => {
  const isFirstColumn = columnIndex === 0;
  const isLastColumn = columnIndex === layout[rowIndex].length - 1;
  const isFirstRow = rowIndex === 0;
  const isLastRow = rowIndex === layout.length - 1;

  const inFront = isFirstRow
    ? []
    : [
        isFirstColumn ? undefined : layout[rowIndex - 1][columnIndex - 1],
        layout[rowIndex - 1][columnIndex],
        isLastColumn ? undefined : layout[rowIndex - 1][columnIndex + 1],
      ];

  const sameRow = [
    isFirstColumn ? undefined : layout[rowIndex][columnIndex - 1],
    isLastColumn ? undefined : layout[rowIndex][columnIndex + 1],
  ];

  const behind = isLastRow
    ? []
    : [
        isFirstColumn ? undefined : layout[rowIndex + 1][columnIndex - 1],
        layout[rowIndex + 1][columnIndex],
        isLastColumn ? undefined : layout[rowIndex + 1][columnIndex + 1],
      ];

  return [...inFront, ...sameRow, ...behind] as Seat[];
};

export const getVisibleOccupiedSeats = (
  layout: Seat[][],
  rowIndex: number,
  columnIndex: number
): number => {
  const directions = ['FL', 'F', 'FR', 'L', 'R', 'BL', 'B', 'BR'];

  const isSeatsInDirections: boolean[] = directions.map((d) => {
    let result = false;
    let rowToCheck = rowIndex;
    let columnToCheck = columnIndex;
    let isInBounds = true;

    while (isInBounds) {
      // rotate
      if (d.includes('F')) {
        rowToCheck -= 1;
      }
      if (d.includes('R')) {
        columnToCheck += 1;
      }
      if (d.includes('B')) {
        rowToCheck += 1;
      }
      if (d.includes('L')) {
        columnToCheck -= 1;
      }

      isInBounds =
        rowToCheck >= 0 &&
        rowToCheck < layout.length &&
        columnToCheck >= 0 &&
        columnToCheck < layout[rowIndex].length;

      // Passenger cannot see 'past' an empty seat
      if (isInBounds && layout[rowToCheck][columnToCheck] === 'L') {
        break;
      }

      if (isInBounds && layout[rowToCheck][columnToCheck] === '#') {
        result = true;
        break;
      }
    }

    return result;
  });

  return isSeatsInDirections.filter(
    (isOccupiedSeatVisible) => isOccupiedSeatVisible
  ).length;
};

// If a seat is empty (L) and there are no occupied seats adjacent to it (all seats are not #), the seat becomes occupied.
// If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
// Otherwise, the seat's state does not change.
export const getNextSeatLayoutFirstChallenge = (
  currentLayout: Seat[][]
): Seat[][] => {
  return currentLayout.map((row, rowIndex) =>
    row.map((seat, columnIndex) => {
      if (seat === 'L') {
        const isSurroundingEmpty = getSurroundingSeats(
          currentLayout,
          rowIndex,
          columnIndex
        ).every((seat) => seat !== '#');
        return isSurroundingEmpty ? '#' : seat;
      }
      if (seat === '#') {
        const isFourSurroundingOccupied =
          getSurroundingSeats(currentLayout, rowIndex, columnIndex).filter(
            (s) => s === '#'
          ).length >= 4;

        return isFourSurroundingOccupied ? 'L' : seat;
      }

      return seat;
    })
  );
};

// it now takes five or more visible occupied seats for an occupied seat to become empty
// (rather than four or more from the previous rules).
export const getNextSeatLayoutSecondChallenge = (
  currentLayout: Seat[][]
): Seat[][] => {
  return currentLayout.map((row, rowIndex) =>
    row.map((seat, columnIndex) => {
      if (seat === 'L') {
        const isSurroundingVisibleEmpty =
          getVisibleOccupiedSeats(currentLayout, rowIndex, columnIndex) === 0;
        return isSurroundingVisibleEmpty ? '#' : seat;
      }
      if (seat === '#') {
        const isSeatTooCrowded =
          getVisibleOccupiedSeats(currentLayout, rowIndex, columnIndex) >= 5;
        return isSeatTooCrowded ? 'L' : seat;
      }

      return seat;
    })
  );
};

const getFinalSeatLayout = (
  initialLayout: Seat[][],
  getNextSeatLayoutFn: (l: Seat[][]) => Seat[][]
): Seat[][] => {
  let currentSeatLayout = initialLayout;
  let nextSeatLayout = getNextSeatLayoutFn(currentSeatLayout);

  while (
    currentSeatLayout.map((r) => r.join('')).join('') !==
    nextSeatLayout.map((r) => r.join('')).join('')
  ) {
    currentSeatLayout = nextSeatLayout.map((r) => r.map((s) => s));
    nextSeatLayout = getNextSeatLayoutFn(currentSeatLayout);
  }
  return currentSeatLayout;
};

const formattedData: Seat[][] = data
  .split('\n')
  .filter((line) => line !== '')
  .map((line) => line.split('') as Seat[]);

export const printAnswer1 = () => {
  const finalSeatLayout = getFinalSeatLayout(
    formattedData,
    getNextSeatLayoutFirstChallenge
  );
  const n = getNumberOfSeat(finalSeatLayout, '#');
  console.log(n);
};

export const printAnswer2 = () => {
  const finalSeatLayout = getFinalSeatLayout(
    formattedData,
    getNextSeatLayoutSecondChallenge
  );
  const n = getNumberOfSeat(finalSeatLayout, '#');
  console.log(n);
};
