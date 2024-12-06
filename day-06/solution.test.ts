import { expect, test } from "vitest";

// import { getLines, logSolution, readFile } from "../lib";

function parse(gridString: string) {
  return gridString.split("\n").map((s) => s.split(""));
}

const gridString = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

test("A grid", () => {
  const grid = parse(gridString);

  expect(grid).toStrictEqual([
    [".", ".", ".", ".", "#", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", "#", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "#", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", "#", ".", ".", "^", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "#", "."],
    ["#", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
  ]);
});

test("Initial position and heading", () => {
  const grid = parse(gridString);

  const y = grid.findIndex((row) => row.includes("^"));

  expect(y).toBe(6);

  const x = grid[y].indexOf("^");

  expect(x).toBe(4);

  const position = { x, y, facing: "NORTH" };
  expect(position).toStrictEqual({ x, y, facing: "NORTH" });
});

test("Initial map does not include person", () => {
  const grid = parse(gridString);

  // Find the person and replace them with empty space
  const map = grid.map((row) =>
    row.map((square) => (square === "^" ? "." : square)),
  );

  expect(map).toStrictEqual([
    [".", ".", ".", ".", "#", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", "#", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "#", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", "#", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "#", "."],
    ["#", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
  ]);
});

type Direction = "NORTH" | "EAST" | "SOUTH" | "WEST";

interface Position {
  x: number;
  y: number;
  facing: Direction;
}

test("Taking a step while facing NORTH decreases y by 1", () => {
  const map = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
  const y = 4;
  const x = 1;
  const position = { x, y, facing: "NORTH" as const };

  const position1 = step(position, map);
  expect(position1.y).toBe(3);

  const position2 = step(position1, map);
  expect(position2.y).toBe(2);

  const position3 = step(position2, map);
  expect(position3.y).toBe(1);
});

function step({ x, y, facing }: Position, map: string[][]): Position {
  const lookingNorthAtBlock = facing === "NORTH" && map[y - 1][x] === "#";
  const lookingEastAtBlock = facing === "EAST" && map[y][x + 1] === "#";
  const lookingSouthAtBlock = facing === "SOUTH" && map[y + 1][x] === "#";
  const lookingWestAtBlock = facing === "WEST" && map[y][x - 1] === "#";

  if (lookingNorthAtBlock) {
    return { x: x + 1, y: y, facing: "EAST" };
  }
  if (lookingEastAtBlock) {
    return { x: x, y: y + 1, facing: "SOUTH" };
  }
  if (lookingSouthAtBlock) {
    return { x: x - 1, y: y, facing: "WEST" };
  }
  if (lookingWestAtBlock) {
    return { x: x, y: y - 1, facing: "NORTH" };
  }
  return { y: y - 1, x: x, facing: facing };
}

test("Trying to step NORTH into a blocked square changes facing to EAST", () => {
  const y = 1;
  const x = 1;
  const position = { x, y, facing: "NORTH" as const };

  const map = [
    [".", "#", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];

  const newPosition = step(position, map);

  expect(newPosition).toStrictEqual({ x: 2, y: 1, facing: "EAST" });
});

test("Trying to step EAST into a blocked square changes facing to SOUTH", () => {
  const y = 1;
  const x = 1;
  const position = { x, y, facing: "EAST" as const };

  const map = [
    [".", ".", "."],
    [".", ".", "#"],
    [".", ".", "."],
  ];

  const newPosition = step(position, map);

  expect(newPosition).toStrictEqual({ x: 1, y: 2, facing: "SOUTH" });
});

test("Trying to step SOUTH into a blocked square changes facing to WEST", () => {
  const y = 1;
  const x = 1;
  const position = { x, y, facing: "SOUTH" as const };

  const map = [
    [".", ".", "."],
    [".", ".", "."],
    [".", "#", "."],
  ];

  const newPosition = step(position, map);

  expect(newPosition).toStrictEqual({ x: 0, y: 1, facing: "WEST" });
});

test("Trying to step WEST into a blocked square changes facing to NORTH", () => {
  const y = 1;
  const x = 1;
  const position = { x, y, facing: "WEST" as const };

  const map = [
    [".", ".", "."],
    ["#", ".", "."],
    [".", ".", "."],
  ];

  const newPosition = step(position, map);

  expect(newPosition).toStrictEqual({ x: 1, y: 0, facing: "NORTH" });
});

test.skip("Part 1", () => {
  // TODO: template for day-xx
  // const file = readFile("./day-xx/input.txt");
  // const lines = getLines(file);
  // const result = ;
  // const expected = ;
  // expect(result).toBe(expected);
  // TODO: template for day-xx
  // logSolution("xx", "1", expected);
  expect(true).toBe(false);
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
