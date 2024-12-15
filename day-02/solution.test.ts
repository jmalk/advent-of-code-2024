import { expect, test } from "vitest";
import { getLines, logSolution, readFile } from "../lib";

const allGaps = (report: number[]) => {
  const gaps: number[] = [];
  for (let i = 0; i < report.length - 1; i++) {
    gaps.push(report[i + 1] - report[i]);
  }
  return gaps;
};

const allAscending = (report: number[]) => {
  const gaps = allGaps(report);
  return gaps.every((gap) => gap > 0);
};

const allDescending = (report: number[]) => {
  const gaps = allGaps(report);
  return gaps.every((gap) => gap < 0);
};

const allSmallGaps = (report: number[]) => {
  const gaps = allGaps(report);
  return gaps.every((gap) => Math.abs(gap) <= 3);
};

const isSafe = (report: number[]) => {
  const isAllAscending = allAscending(report);
  const isAllDescending = allDescending(report);
  const isAllSmallGaps = allSmallGaps(report);
  return isAllSmallGaps && (isAllAscending || isAllDescending);
};

const sumSafeReports = (parsed: number[][]) => {
  const safeReports = parsed.filter((report) => isSafe(report));
  return safeReports.length;
};

test("Part 1 example", () => {
  const parsed = parseFile("./day-02/example.txt");
  const result = sumSafeReports(parsed);

  expect(result).toBe(2);
});

function parseFile(fileName: string) {
  const file = readFile(fileName);
  const lines = getLines(file);
  return lines.map((line) => line.split(" ").map((str) => parseInt(str)));
}

test("Part 1", () => {
  const parsed = parseFile("./day-02/input.txt");
  const result = sumSafeReports(parsed);
  const expected = 224;
  expect(result).toBe(expected);
  logSolution("02", "1", expected);
});

// Return copies of the report, each with a different level (element) removed.
function mutations(report: number[]): number[][] {
  // @ts-expect-error Intellij doesn't recognise toSpliced, but it's not worth faffing with
  return report.map((_, index) => report.toSpliced(index, 1));
}

test("mutations returns copies of the report, each with a different level (element) removed", () => {
  const report = [1, 2, 3, 4];

  expect(mutations(report)).toStrictEqual([
    [2, 3, 4],
    [1, 3, 4],
    [1, 2, 4],
    [1, 2, 3],
  ]);
});

function sumSafeReportsWithDampener(parsed: number[][]) {
  const safeReports = parsed.filter(
    (report) =>
      isSafe(report) || mutations(report).some((mutation) => isSafe(mutation)),
  );
  return safeReports.length;
}

test("Part 2 example", () => {
  const parsed = parseFile("./day-02/example.txt");
  const result = sumSafeReportsWithDampener(parsed);

  expect(result).toBe(4);
});

test("Part 2", () => {
  const parsed = parseFile("./day-02/input.txt");
  const result = sumSafeReportsWithDampener(parsed);
  const expected = 293;
  expect(result).toBe(expected);
  logSolution("02", "2", expected);
});
