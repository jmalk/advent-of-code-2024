import { describe, expect, test } from "vitest";

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
  stepsTaken: number;
  x: number;
  y: number;
  facing: Direction;
}

function step(
  { x, y, facing, stepsTaken }: Position,
  map: string[][],
): Position {
  const lookingNorthAtBlock = facing === "NORTH" && map[y - 1][x] === "#";
  const lookingEastAtBlock = facing === "EAST" && map[y][x + 1] === "#";
  const lookingSouthAtBlock = facing === "SOUTH" && map[y + 1][x] === "#";
  const lookingWestAtBlock = facing === "WEST" && map[y][x - 1] === "#";
  const lookingAtBlock =
    lookingNorthAtBlock ||
    lookingEastAtBlock ||
    lookingSouthAtBlock ||
    lookingWestAtBlock;

  const turnRight = (facing: Direction) => {
    const mapping: Record<Direction, Direction> = {
      NORTH: "EAST",
      EAST: "SOUTH",
      SOUTH: "WEST",
      WEST: "NORTH",
    };
    return mapping[facing];
  };

  const newFacing = lookingAtBlock ? turnRight(facing) : facing;

  if (newFacing === "EAST") {
    return { y: y, x: x + 1, facing: newFacing, stepsTaken: 1 };
  }

  if (newFacing === "SOUTH") {
    return { y: y + 1, x: x, facing: newFacing, stepsTaken: 1 };
  }

  if (newFacing === "WEST") {
    return { y: y, x: x - 1, facing: newFacing, stepsTaken: 1 };
  }

  return { y: y - 1, x: x, facing: newFacing, stepsTaken: stepsTaken + 1 };
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
  const position = { x, y, facing: "NORTH" as const, stepsTaken: 0 };

  const position1 = step(position, map);
  expect(position1.y).toBe(3);

  const position2 = step(position1, map);
  expect(position2.y).toBe(2);

  const position3 = step(position2, map);
  expect(position3.y).toBe(1);
});

test("Taking a step while facing NORTH increases steps taken by 1", () => {
  const map = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
  const y = 4;
  const x = 1;
  const position = { x, y, facing: "NORTH" as const, stepsTaken: 0 };

  const position1 = step(position, map);
  expect(position1.stepsTaken).toBe(1);

  const position2 = step(position1, map);
  expect(position2.stepsTaken).toBe(2);

  const position3 = step(position2, map);
  expect(position3.stepsTaken).toBe(3);
});

test("Taking a step while facing SOUTH increases y by 1", () => {
  const map = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
  const y = 1;
  const x = 1;
  const position = { x, y, facing: "SOUTH" as const, stepsTaken: 0 };

  const position1 = step(position, map);
  expect(position1.y).toBe(2);

  const position2 = step(position1, map);
  expect(position2.y).toBe(3);

  const position3 = step(position2, map);
  expect(position3.y).toBe(4);
});

test("Taking a step while facing EAST increases x by 1", () => {
  const map = [
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
  ];
  const y = 1;
  const x = 1;
  const position = { x, y, facing: "EAST" as const, stepsTaken: 0 };

  const position1 = step(position, map);
  expect(position1.x).toBe(2);

  const position2 = step(position1, map);
  expect(position2.x).toBe(3);

  const position3 = step(position2, map);
  expect(position3.x).toBe(4);
});

test("Taking a step while facing WEST decreases x by 1", () => {
  const map = [
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
  ];
  const y = 1;
  const x = 4;
  const position = { x, y, facing: "WEST" as const, stepsTaken: 0 };

  const position1 = step(position, map);
  expect(position1.x).toBe(3);

  const position2 = step(position1, map);
  expect(position2.x).toBe(2);

  const position3 = step(position2, map);
  expect(position3.x).toBe(1);
});

test("Trying to step NORTH into a blocked square changes facing to EAST", () => {
  const y = 1;
  const x = 1;
  const position = { x, y, facing: "NORTH" as const, stepsTaken: 0 };

  const map = [
    [".", "#", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];

  const newPosition = step(position, map);

  expect(newPosition).toStrictEqual({
    x: 2,
    y: 1,
    facing: "EAST",
    stepsTaken: 1,
  });
});

test("Trying to step EAST into a blocked square changes facing to SOUTH", () => {
  const y = 1;
  const x = 1;
  const position = { x, y, facing: "EAST" as const, stepsTaken: 0 };

  const map = [
    [".", ".", "."],
    [".", ".", "#"],
    [".", ".", "."],
  ];

  const newPosition = step(position, map);

  expect(newPosition).toStrictEqual({
    x: 1,
    y: 2,
    facing: "SOUTH",
    stepsTaken: 1,
  });
});

test("Trying to step SOUTH into a blocked square changes facing to WEST", () => {
  const y = 1;
  const x = 1;
  const position = { x, y, facing: "SOUTH" as const, stepsTaken: 0 };

  const map = [
    [".", ".", "."],
    [".", ".", "."],
    [".", "#", "."],
  ];

  const newPosition = step(position, map);

  expect(newPosition).toStrictEqual({
    x: 0,
    y: 1,
    facing: "WEST",
    stepsTaken: 1,
  });
});

test("Trying to step WEST into a blocked square changes facing to NORTH", () => {
  const y = 1;
  const x = 1;
  const position = { x, y, facing: "WEST" as const, stepsTaken: 0 };

  const map = [
    [".", ".", "."],
    ["#", ".", "."],
    [".", ".", "."],
  ];

  const newPosition = step(position, map);

  expect(newPosition).toStrictEqual({
    x: 1,
    y: 0,
    facing: "NORTH",
    stepsTaken: 1,
  });
});

const guardGone = (
  position: { x: number; y: number; facing: string },
  map: string[][],
) => {
  return (
    position.y < 0 ||
    position.x < 0 ||
    position.x > map[0].length - 1 ||
    position.y > map.length - 1
  );
};

describe("Guard gone?", function () {
  const map = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];

  test("Guard has not gone if they are within the map", () => {
    const position = { x: 1, y: 1, facing: "NORTH" as const };

    expect(guardGone(position, map)).toBe(false);
  });

  test("Guard has gone if they are NORTH of the map", () => {
    const position = { x: 1, y: -1, facing: "NORTH" as const };

    expect(guardGone(position, map)).toBe(true);
  });

  test("Guard has gone if they are WEST of the map", () => {
    const position = { x: -1, y: 1, facing: "WEST" as const };

    expect(guardGone(position, map)).toBe(true);
  });

  test("Guard has gone if they are EAST of the map", () => {
    const position = { x: 3, y: 1, facing: "EAST" as const };

    expect(guardGone(position, map)).toBe(true);
  });

  test("Guard has gone if they are SOUTH of the map", () => {
    const position = { x: 1, y: 3, facing: "SOUTH" as const };

    expect(guardGone(position, map)).toBe(true);
  });
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
