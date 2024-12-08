import { readLines } from "./utils";

const FILE_PATH = "7-test";

const concatNumbers = (n: number, m: number): number => {
  const ns = n.toString();
  const ms = m.toString();
  const resultStr = ns.concat(ms);
  return parseInt(resultStr);
};

const validateOperands = (n: number, m: number, target: number) =>
  n + m === target || n * m === target || concatNumbers(n, m) === target;

const validateEquation = (operands: number[], target: number): boolean => {
  if (operands.length === 2) {
    return validateOperands(operands[0], operands[1], target);
  }

  const a = operands[0];
  const b = operands[1];
  const sum = a + b;
  const product = a * b;
  const concat = concatNumbers(a, b);

  return (
    validateEquation([sum].concat(operands.slice(2)), target) ||
    validateEquation([product].concat(operands.slice(2)), target) ||
    validateEquation([concat].concat(operands.slice(2)), target)
  );
};

const compute = (lines: string[]) => {
  let result = 0;
  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split(":");
    const [prefix, suffix] = parts;
    const total = parseInt(prefix);
    const operands = suffix
      .substring(1)
      .split(" ")
      .map((s) => parseInt(s));
    if (validateEquation(operands, total)) {
      result += total;
    }
  }
  return result;
};

readLines(FILE_PATH).then((l) => console.log(compute(l)));

