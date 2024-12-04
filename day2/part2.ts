import { readLines } from "./utils";

const FILE_PATH = "2-input";

const compute = (lines: string[]) => {
  let result = 0;

  lines.forEach((l) => {
    const report = parseReport(l);
    if (checkReport(report, true)) {
      result++;
    }
  });

  return result;
};

const parseReport = (l: string): number[] => {
  let digits = [];
  const result = [];

  let i = 0;
  while (i < l.length) {
    while (i < l.length && l.charAt(i) >= "0" && l.charAt(i) <= "9") {
      digits.push(l.charAt(i));
      i++;
    }

    result.push(parseInt(digits.join("")));
    digits = [];

    while (i < l.length && (l.charAt(i) < "0" || l.charAt(i) > "9")) {
      i++;
    }
  }
  return result;
};

const toRemoved = (a: number[], i: number): number[] => {
  return a.slice(0, i).concat(a.slice(i + 1));
};

const checkReport = (r: number[], damper: boolean): boolean => {
  let dir = 0;
  let prev = -1;

  for (let i = 0; i < r.length; i++) {
    let n = r[i];
    if (prev !== -1) {
      const diff = n - prev;
      if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
        if (damper) {
          for (let j = 0; j < r.length; j++) {
            if (checkReport(toRemoved(r, j), false)) {
              return true;
            }
          }
        }
        return false;
      }
      if (dir === 0) {
        dir = diff > 0 ? 1 : -1;
      } else if ((dir === 1 && diff < 0) || (dir === -1 && diff > 0)) {
        if (damper) {
          for (let j = 0; j < r.length; j++) {
            if (checkReport(toRemoved(r, j), false)) {
              return true;
            }
          }
        }
        return false;
      }
    }
    prev = n;
  }
  return true;
};

readLines(FILE_PATH).then((l) => console.log(compute(l)));

