import { readLines } from "./utils";

const FILE_PATH = "4-input";

const DIRS = [
  [1, -1],
  [1, 1],
  [-1, 1],
  [-1, -1],
];

const charAt = (lines: string[], x, y): string => {
  const row = lines[y];
  return row.charAt(x);
};

const isValid = (m: number, n: number, x: number, y: number): boolean =>
  x >= 0 && x < m && y >= 0 && y < n;

const getCombination = (
  m: number,
  n: number,
  x: number,
  y: number
): [number, number][] => {
  const result = [];
  DIRS.forEach((d) => {
    const newCoord = [x + d[0], y + d[1]];
    if (!isValid(m, n, newCoord[0], newCoord[1])) {
      return [];
    }
    result.push(newCoord);
  });
  return result;
};

const checkCombination = (
  lines: string[],
  combination: [number, number][]
): boolean => {
  let mx = -1;
  let my = -1;
  let nm = 0;
  let ns = 0;

  combination.forEach((c) => {
    const l = charAt(lines, c[0], c[1]);
    if (l === "M" && nm < 2) {
      if (mx === -1) {
        mx = c[0];
        my = c[1];
        nm++;
      } else if (mx === c[0] || my === c[1]) {
        nm++;
      }
    } else if (l === "S" && ns < 2) {
      ns++;
    } else {
      return false;
    }
  });

  return nm > 1 && ns > 1;
};

const compute = (lines: string[]) => {
  let result = 0;
  const m = lines.length;
  const n = lines[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (charAt(lines, i, j) === "A") {
        const combination = getCombination(m, n, i, j);
        result += checkCombination(lines, combination) ? 1 : 0;
      }
    }
  }
  return result;
};

readLines(FILE_PATH).then((l) => console.log(compute(l)));

