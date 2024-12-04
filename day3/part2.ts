import { readLines } from "./utils";

const FILE_PATH = "3-input";

const toOperands = (o: string): [number, number] => {
  const trimmed = o.slice(4, o.length - 1);
  const operands = trimmed.split(",").map((s) => parseInt(s));
  return [operands[0], operands[1]];
};

const compute = (lines: string[]) => {
  let result = 0;
  const input = lines.join("");

  const operations: [string, number][] = [];

  const openRegex = /do\(\)/g;
  while (openRegex.exec(input) !== null) {
    operations.push(["open", openRegex.lastIndex]);
  }

  const closeRegex = /don't\(\)/g;
  while (closeRegex.exec(input) !== null) {
    operations.push(["close", closeRegex.lastIndex]);
  }

  const mulRegex = /mul\([0-9]+,[0-9]+\)/g;
  let found: string[];
  while ((found = mulRegex.exec(input)) !== null) {
    operations.push([found[0], mulRegex.lastIndex]);
  }

  operations.sort((a, b) => a[1] - b[1]);

  let i = 0;
  while (i < operations.length) {
    if (operations[i][0] === "close") {
      while (i < operations.length && operations[i][0] !== "open") {
        i++;
      }
    } else {
      if (operations[i][0] !== "open") {
        const operands = toOperands(operations[i][0]);
        result += operands[0] * operands[1];
      }
      i++;
    }
  }

  return result;
};

readLines(FILE_PATH).then((l) => console.log(compute(l)));

