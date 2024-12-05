import { describe, expect, test } from "vitest";
import { doTheWork, isValidOrder, middle, parseRuleString } from "./solution";
import { logSolution, readFile } from "../lib";

test("Middle element", () => {
  expect(middle([1, 2, 3, 4, 5])).toBe(3);
  expect(middle([1, 2, 3])).toBe(2);
});

describe("Valid page order", function () {
  const rules = [
    [47, 53],
    [97, 13],
    [97, 61],
    [97, 47],
    [75, 29],
    [61, 13],
    [75, 53],
    [29, 13],
    [97, 29],
    [53, 29],
    [61, 53],
    [97, 53],
    [61, 29],
    [47, 13],
    [75, 47],
    [97, 75],
    [47, 61],
    [75, 61],
    [47, 29],
    [75, 13],
    [53, 13],
  ];

  test("First example", () => {
    const order = [75, 47, 61, 53, 29];

    expect(isValidOrder(order, rules)).toBe(true);
  });

  test("Fourth example", () => {
    const order = [75, 97, 47, 61, 53];

    expect(isValidOrder(order, rules)).toBe(false);
  });
});

test("Parse rule string", () => {
  expect(parseRuleString("47|53")).toStrictEqual([47, 53]);
});

test("Part 1 example", () => {
  const file = readFile("./day-05/sample-input.txt");
  const result = doTheWork(file);
  const expected = 143;
  expect(result).toBe(expected);
});

test("Part 1", () => {
  const file = readFile("./day-05/input.txt");
  const result = doTheWork(file);
  const expected = 6384;
  expect(result).toBe(expected);
  logSolution("05", "1", expected);
});

test.skip("Part 2", () => {
  // TODO: template for day-xx
  // const file = readFile("./day-xx/input.txt");
  // const lines = getLines(file);
  // const result = ;
  // const expected = ;
  // expect(result).toBe(expected);
  // TODO: template for day-xx
  // logSolution("xx", "2", expected);
  expect(true).toBe(false);
});
