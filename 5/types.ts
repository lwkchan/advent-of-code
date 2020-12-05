// The first 7 characters will either be F or B; these specify exactly one of the
// 128 rows on the plane (numbered 0 through 127). Each letter tells you which half
// of a region the given seat is in. Start with the whole list of rows; the first
// letter indicates whether the seat is in the front (0 through 63) or the back
// (64 through 127). The next letter indicates which half of that region the seat is in,
// and so on until you're left with exactly one row.

export type RowPartition = 'F' | 'B';

export type ColumnPartition = 'L' | 'R';

// RowPartition * 7, ColumnPartition * 3
export type SeatCode = `${RowPartition}${RowPartition}${RowPartition}${RowPartition}${RowPartition}${RowPartition}${RowPartition}${ColumnPartition}${ColumnPartition}${ColumnPartition}`;
