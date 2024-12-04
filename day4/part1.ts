import { readLines } from "./utils";

const FILE_PATH = "4-input";

const WORD = "XMAS";
const DIRS = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];

const charAt = (lines: string[], x, y): string => {
  const row = lines[y];
  return row.charAt(x);
};

const isValid = (m: number, n: number, x: number, y: number): boolean =>
  x >= 0 && x < m && y >= 0 && y < n;

const getCombinations = (
  m: number,
  n: number,
  x: number,
  y: number
): [number, number][][] => {
  const result = [];
  DIRS.forEach((d) => {
    if (isValid(m, n, x + d[0] * 3, y + d[1] * 3)) {
      const combo = [[x, y]];
      for (let i = 1; i < 4; i++) {
        combo.push([x + d[0] * i, y + d[1] * i]);
      }
      result.push(combo);
    }
  });
  return result;
};

const checkCombination = (
  lines: string[],
  combination: [number, number][]
): boolean => {
  for (let i = 0; i < combination.length; i++) {
    const c = combination[i];
    if (charAt(lines, c[0], c[1]) !== WORD.charAt(i)) {
      return false;
    }
  }
  return true;
};

const compute = (lines: string[]) => {
  let result = 0;
  const m = lines.length;
  const n = lines[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const combinations = getCombinations(m, n, i, j);
      combinations.forEach((c) => {
        if (checkCombination(lines, c)) {
          result++;
        }
      });
    }
  }
  return result;
};

readLines(FILE_PATH).then((l) => console.log(compute(l)));

