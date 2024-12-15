export const read = (memory: string) => {
  return Array.from(
    // Find all mul(xxx,xxx)
    memory.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g),
    // Map to tuples of [number, number]
    (m) => [parseInt(m[1]), parseInt(m[2])] as const,
  );
};

export const readWithConditionals = (memory: string) => {
  const matches = [
    ...memory.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g),
  ];

  const ret: (readonly [number, number])[] = [];
  let enabled = true;

  matches.forEach((match) => {
    if (match[0] === `don't()`) {
      enabled = false;
    }
    if (match[0] === `do()`) {
      enabled = true;
    }
    if (enabled && match[0].startsWith("mul")) {
      ret.push([parseInt(match[1]), parseInt(match[2])]);
    }
  });

  return ret;
};

export const multiply = (pairs: (readonly [number, number])[]) => {
  return pairs.reduce((accumulated, current) => {
    return accumulated + current[0] * current[1];
  }, 0);
};
