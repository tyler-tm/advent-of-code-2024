import { readLines } from "./utils";

const FILE_PATH = "1-input";

const compute = (lines: string[]) => {
  const lefts = [];
  const rights = [];

  lines.forEach((l) => {
    const leftDigits = [];
    const rightDigits = [];
    let i = 0;

    while (l.charAt(i) !== " ") {
      leftDigits.push(l.charAt(i));
      i++;
    }
    const leftNum = parseInt(leftDigits.join(""));
    lefts.push(leftNum);

    while (l.charAt(i) === " ") {
      i++;
    }

    while (i < l.length) {
      rightDigits.push(l.charAt(i));
      i++;
    }
    const rightNum = parseInt(rightDigits.join(""));
    rights.push(rightNum);
  });

  const rightMap = new Map<number, number>();

  rights.forEach((r) => {
    if (!rightMap.has(r)) {
      rightMap.set(r, 0);
    }
    const existing = rightMap.get(r);
    rightMap.set(r, existing + 1);
  });

  let result = 0;
  let i = 0;
  while (i < lefts.length) {
    const n = lefts[i];
    result += n * (rightMap.get(n) || 0);
    i++;
  }
  return result;
};

readLines(FILE_PATH).then((l) => console.log(compute(l)));

