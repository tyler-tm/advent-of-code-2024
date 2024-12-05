import { readLines } from "./utils";

const FILE_PATH = "5-input";

const rulesToMap = (rules: string[]): Map<number, number[]> => {
  // Values to values that must appear before them
  const result = new Map<number, number[]>();
  rules.forEach((r) => {
    const parts = r.split("|");
    const before: number = parseInt(parts[0]);
    const after: number = parseInt(parts[1]);
    const existing = result.get(after) ?? [];
    result.set(after, existing.concat([before]));
  });
  return result;
};

const isValidUpdate = (ruleMap: Map<number, number[]>, update: number[]) => {
  const seen = new Map<number, number>();

  // Update values to position
  update.forEach((n, i) => {
    if (!seen.has(n)) {
      seen.set(n, i);
    }
  });

  for (let i = 0; i < update.length; i++) {
    const k = update[i];
    const rules = ruleMap.get(k) ?? [];
    for (let j = 0; j < rules.length; j++) {
      const r = rules[j];
      // Both number in a rule are present, but order not valid
      if (seen.has(r) && seen.get(r) > i) {
        return false;
      }
    }
  }

  return true;
};

const toMiddleElement = <T>(a: T[]): T => a[Math.floor(a.length / 2)];

const compute = (lines: string[]) => {
  let sum = 0;
  const rules = [];
  const updates = [];

  let i = 0;
  while (lines[i] !== "") {
    rules.push(lines[i]);
    i++;
  }
  i++;
  while (i < lines.length) {
    updates.push(lines[i].split(",").map((n) => parseInt(n)));
    i++;
  }

  const validUpdates: number[][] = [];
  const ruleMap = rulesToMap(rules);

  updates.forEach((u) => {
    if (isValidUpdate(ruleMap, u)) {
      validUpdates.push(u);
    }
  });

  validUpdates.forEach((v) => {
    const middle = toMiddleElement(v);
    console.log(`adding ${middle}`);
    sum += middle;
  });

  return sum;
};

readLines(FILE_PATH).then((l) => console.log(compute(l)));

