import { expect, test } from "vitest";
import { multiply, read, readWithConditionals } from "./solution";
import { logSolution, readFile } from "../lib";

test("Reading corrupted memory", () => {
  const memory =
    "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

  expect(read(memory)).toStrictEqual([
    [2, 4],
    [5, 5],
    [11, 8],
    [8, 5],
  ]);
});

test("Multiplying pairs of numbers", () => {
  const pairs = [
    [2, 4] as const,
    [5, 5] as const,
    [11, 8] as const,
    [8, 5] as const,
  ];

  expect(multiply(pairs)).toBe(161);
});

test("Part 1", () => {
  const file = readFile("./day-03/input.txt");
  // No need to split into lines because we're using a regex on the whole chunk of text
  // const lines = getLines(file);
  const result = multiply(read(file));
  const expected = 179571322;
  expect(result).toBe(expected);
  logSolution("03", "1", expected);
});

test("Reading corrupted memory with conditionals: empty memory", () => {
  const memory = "";

  expect(readWithConditionals(memory)).toStrictEqual([]);
});

test.skip("Reading corrupted memory with conditionals", () => {
  const memory =
    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

  expect(readWithConditionals(memory)).toStrictEqual([
    [2, 4],
    [8, 5],
  ]);
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
