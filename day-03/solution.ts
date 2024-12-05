export const read = (memory: string) => {
  const ret = Array.from(
    // Find all mul(xxx,xxx)
    memory.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g),
    // Map to tuples of [number, number]
    (m) => [parseInt(m[1]), parseInt(m[2])] as const,
  );
  return ret;
};

export const readWithConditionals = (memory: string) => {
  const ret = Array.from(
    // Find all mul(xxx,xxx)
    memory.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g),
    // Map to tuples of [number, number]
    (m) => [parseInt(m[1]), parseInt(m[2])] as const,
  );
  return ret;
};

export const multiply = (pairs: (readonly [number, number])[]) => {
  return pairs.reduce((accumulated, current) => {
    return accumulated + current[0] * current[1];
  }, 0);
};
