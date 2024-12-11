import { describe, expect, test } from "vitest";
import { logSolution, readFile } from "../lib";

// import { getLines, logSolution, readFile } from "../lib";

function parse(gridString: string): { map: string[][]; position: Position } {
  const rawGrid = gridString.split("\n").map((s) => s.split(""));
  const y = rawGrid.findIndex((row) => row.includes("^"));
  const x = rawGrid[y].indexOf("^");

  // Find the person and replace them with empty space
  const map = rawGrid.map((row) =>
    row.map((square) => (square === "^" ? "." : square)),
  );

  return { map, position: { x, y, facing: "NORTH", stepsTaken: 0 } };
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
  const { map, position } = parse(gridString);

  expect(position.x).toBe(4);
  expect(position.y).toBe(6);
  expect(position.facing).toBe("NORTH");
  expect(position.stepsTaken).toBe(0);

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
  const lookingNorthAtBlock = facing === "NORTH" && map[y - 1]?.[x] === "#";
  const lookingEastAtBlock = facing === "EAST" && map[y][x + 1] === "#";
  const lookingSouthAtBlock = facing === "SOUTH" && map[y + 1]?.[x] === "#";
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
    return { y: y, x: x + 1, facing: newFacing, stepsTaken: stepsTaken + 1 };
  }

  if (newFacing === "SOUTH") {
    return { y: y + 1, x: x, facing: newFacing, stepsTaken: stepsTaken + 1 };
  }

  if (newFacing === "WEST") {
    return { y: y, x: x - 1, facing: newFacing, stepsTaken: stepsTaken + 1 };
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

test("Taking a step while facing SOUTH increases steps taken by 1", () => {
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
  expect(position1.stepsTaken).toBe(1);

  const position2 = step(position1, map);
  expect(position2.stepsTaken).toBe(2);

  const position3 = step(position2, map);
  expect(position3.stepsTaken).toBe(3);
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

test("Taking a step while facing EAST increases steps taken by 1", () => {
  const map = [
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
  ];
  const y = 1;
  const x = 1;
  const position = { x, y, facing: "EAST" as const, stepsTaken: 0 };

  const position1 = step(position, map);
  expect(position1.stepsTaken).toBe(1);

  const position2 = step(position1, map);
  expect(position2.stepsTaken).toBe(2);

  const position3 = step(position2, map);
  expect(position3.stepsTaken).toBe(3);
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

test("Taking a step while facing WEST increases steps taken by 1", () => {
  const map = [
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
  ];
  const y = 1;
  const x = 4;
  const position = { x, y, facing: "WEST" as const, stepsTaken: 0 };

  const position1 = step(position, map);
  expect(position1.stepsTaken).toBe(1);

  const position2 = step(position1, map);
  expect(position2.stepsTaken).toBe(2);

  const position3 = step(position2, map);
  expect(position3.stepsTaken).toBe(3);
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

const guardGone = (position: Position, map: string[][]) => {
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
    const position = { x: 1, y: 1, facing: "NORTH" as const, stepsTaken: 0 };

    expect(guardGone(position, map)).toBe(false);
  });

  test("Guard has gone if they are NORTH of the map", () => {
    const position = { x: 1, y: -1, facing: "NORTH" as const, stepsTaken: 0 };

    expect(guardGone(position, map)).toBe(true);
  });

  test("Guard has gone if they are WEST of the map", () => {
    const position = { x: -1, y: 1, facing: "WEST" as const, stepsTaken: 0 };

    expect(guardGone(position, map)).toBe(true);
  });

  test("Guard has gone if they are EAST of the map", () => {
    const position = { x: 3, y: 1, facing: "EAST" as const, stepsTaken: 0 };

    expect(guardGone(position, map)).toBe(true);
  });

  test("Guard has gone if they are SOUTH of the map", () => {
    const position = { x: 1, y: 3, facing: "SOUTH" as const, stepsTaken: 0 };

    expect(guardGone(position, map)).toBe(true);
  });
});

function getCoordString(position: Position) {
  return `${position.x},${position.y}`;
}

function countUniqueLocations(position: Position, map: string[][]) {
  const coordString = getCoordString(position);
  const uniqueSteps = new Set([coordString]);

  let gone = guardGone(position, map);
  while (!gone) {
    position = step(position, map);
    gone = guardGone(position, map);
    // A bit clunky, but it fixes the off by one error:
    if (!gone) {
      uniqueSteps.add(getCoordString(position));
    }
  }

  return uniqueSteps.size;
}

test("Part 1 example", function () {
  const { map, position } = parse(gridString);

  const result = countUniqueLocations(position, map);

  expect(result).toBe(41);
});

test("Part 1", () => {
  const file = readFile("./day-06/input.txt");
  const { map, position } = parse(file);

  const result = countUniqueLocations(position, map);

  const expected = 5239;
  expect(result).toBe(expected);
  logSolution("06", "1", expected);
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
