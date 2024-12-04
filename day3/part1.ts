import { readLines } from "./utils";

const FILE_PATH = "3-input";

const compute = (lines: string[]) => {
  let result = 0;

  lines.forEach((l) => {
    const re = /mul\([0-9]+,[0-9]+\)/g;
    const operations = l.match(re);
    operations.forEach((o) => {
      const trimmed = o.slice(4, o.length - 1);
      const operands = trimmed.split(",").map((s) => parseInt(s));
      result += operands[0] * operands[1];
    });
  });

  return result;
};

readLines(FILE_PATH).then((l) => console.log(compute(l)));

