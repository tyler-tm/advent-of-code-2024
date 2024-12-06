import { readLines } from "./utils";

const FILE_PATH = "6-input";

const dirs = {
  "^": {
    move: [0, -1],
    next: ">",
  },
  ">": {
    move: [1, 0],
    next: "V",
  },
  V: {
    move: [0, 1],
    next: "<",
  },
  "<": {
    move: [-1, 0],
    next: "^",
  },
};

const charAt = (lines: string[], x, y): string => {
  const row = lines[y];
  return row.charAt(x);
};

const isValidCoord = (m: number, n: number, x: number, y: number) =>
  x >= 0 && x < m && y >= 0 && y < n;

const toKey = (x: number, y: number) => `${x},${y}`;

const compute = (lines: string[]) => {
  // coord -> dir[]
  const visited = new Map<string, string[]>();
  let m = lines[0].length; // num cols (x)
  let n = lines.length; // num rows (y)

  let start = [-1, -1];
  let dir = "^";

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const c = charAt(lines, j, i);
      if (dirs[c] !== undefined) {
        start = [j, i];
        dir = c;
        i = lines.length;
        j = lines[0].length;
      }
    }
  }

  let x = start[0];
  let y = start[1];
  while (isValidCoord(m, n, x, y)) {
    const key = toKey(x, y);
    const existing = visited.get(key) ?? [];
    visited.set(key, existing.concat([dir]));
    const { move, next } = dirs[dir];
    const nx = x + move[0];
    const ny = y + move[1];
    if (!isValidCoord(m, n, nx, ny)) {
      break;
    }
    const target = charAt(lines, nx, ny);
    if (target === "#") {
      dir = next;
    } else {
      x = nx;
      y = ny;
    }
  }

  return visited.size;
};

readLines(FILE_PATH).then((l) => console.log(compute(l)));

