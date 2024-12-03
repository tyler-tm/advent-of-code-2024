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

  lefts.sort();
  rights.sort();

  let result = 0;
  let i = 0;
  while (i < lefts.length) {
    result += Math.abs(lefts[i] - rights[i]);
    i++;
  }
  return result;
};

readLines(FILE_PATH).then((l) => console.log(compute(l)));

