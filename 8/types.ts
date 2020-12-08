export type Operation = 'acc' | 'jmp' | 'nop';

export type Instruction = [Operation, number];
