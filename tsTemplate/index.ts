import fs, { readFileSync } from 'fs';
import path from 'path';

const data = readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
