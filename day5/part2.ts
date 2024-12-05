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

function moveElement<T>(array: T[], fromIndex: number, toIndex: number): T[] {
  const result = array.slice();
  const [toMove] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, toMove);
  return result;
}

const toValidUpdate = (
  ruleMap: Map<number, number[]>,
  update: number[],
  first = false
): number[] => {
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
        // Move value back to first valid spot, re-validate
        return toValidUpdate(ruleMap, moveElement(update, seen.get(r), i));
      }
    }
  }

  // This was an originally valid update, return empty array to be filtered out
  return first ? [] : update;
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

  const fixedUpdates: number[][] = [];
  const ruleMap = rulesToMap(rules);

  updates.forEach((u) => {
    const newUpdate = toValidUpdate(ruleMap, u, true);
    // Push non-empty (changed) updates to results
    if (newUpdate.length > 0) {
      fixedUpdates.push(newUpdate);
    }
  });

  fixedUpdates.forEach((v) => {
    const middle = toMiddleElement(v);
    sum += middle;
  });

  return sum;
};

readLines(FILE_PATH).then((l) => console.log(compute(l)));

