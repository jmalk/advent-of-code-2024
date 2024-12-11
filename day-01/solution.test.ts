import { expect, test } from "vitest";
import { getLines, logSolution, readFile } from "../lib";

const zip = (arr1, arr2) => {
  const result = [];

  for (let i = 0; i < arr1.length; i++) {
    result.push([arr1[i], arr2[i]]);
  }

  return result;
};

test("Zip two arrays", () => {
  const arr1 = [1, 2, 3];
  const arr2 = [4, 5, 6];

  expect(zip(arr1, arr2)).toStrictEqual([
    [1, 4],
    [2, 5],
    [3, 6],
  ]);
});

const counts = (array: number[]) => {
  return array.reduce((accumulator, value) => {
    return {
      ...accumulator,
      [value]: accumulator[value] ? accumulator[value] + 1 : 1,
    };
  }, {});
};

test("Count occurrences of numbers in an array", () => {
  const array = [3, 4, 2, 1, 3, 3];

  expect(counts(array)).toStrictEqual({
    1: 1,
    2: 1,
    3: 3,
    4: 1,
  });
});

function parseFile(filename: string) {
  const file = readFile(filename);
  const lines = getLines(file);
  return lines.map((str) => str.split("   ").map((str) => parseInt(str)));
}

function sumDifferences(parsed: number[][]) {
  const left = parsed.map((pairs) => pairs[0]);
  const right = parsed.map((pairs) => pairs[1]);

  const sortedLeft = left.sort();
  const sortedRight = right.sort();

  const zipped = zip(sortedLeft, sortedRight);

  return zipped.reduce((accumulated, current) => {
    return accumulated + Math.abs(current[0] - current[1]);
  }, 0);
}

test("Part 1 example", () => {
  const parsed = parseFile("./day-01/example.txt");

  const result = sumDifferences(parsed);

  const expected = 11;
  expect(result).toBe(expected);
});

test("Part 1", () => {
  const parsed = parseFile("./day-01/input.txt");

  const result = sumDifferences(parsed);

  const expected = 1765812;
  expect(result).toBe(expected);

  logSolution("01", "1", expected);
});

const sum = (array) => array.reduce((a, b) => a + b, 0);

const similarity = (left: number[], right: number[]) => {
  const occurrences = counts(right);
  return left.map((n) => n * (occurrences[n] ?? 0));
};

test("Part 2 example", () => {
  const parsed = parseFile("./day-01/example.txt");
  const left = parsed.map((pairs) => pairs[0]);
  const right = parsed.map((pairs) => pairs[1]);

  const similarities = similarity(left, right);

  const result = sum(similarities);

  const expected = 31;
  expect(result).toBe(expected);
});

const sumSimilarities = (parsed: number[][]) => {
  const left = parsed.map((pairs) => pairs[0]);
  const right = parsed.map((pairs) => pairs[1]);

  const similarities = similarity(left, right);

  return sum(similarities);
};
test("Part 2", () => {
  const parsed = parseFile("./day-01/input.txt");

  const result = sumSimilarities(parsed);

  const expected = 20520794;
  expect(result).toBe(expected);
  logSolution("01", "2", expected);
});
