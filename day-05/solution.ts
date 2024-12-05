export const middle = (numbers: number[]) => {
  const middleIndex = Math.ceil(numbers.length / 2) - 1;
  return numbers[middleIndex];
};

const isObeyed = (order: number[], rule: number[]) => {
  const ruleApplies = order.includes(rule[0]) && order.includes(rule[1]);
  if (!ruleApplies) {
    return true;
  }

  const shouldBeFirst = rule[0];
  const shouldBeSecond = rule[1];
  return order.indexOf(shouldBeFirst) < order.indexOf(shouldBeSecond);
};

export const isValidOrder = (order: number[], rules: number[][]) => {
  return rules.every((rule) => isObeyed(order, rule));
};
export const parseRuleString = (str: string) => {
  return str.split("|").map((s) => parseInt(s));
};

export function parseOrderString(str: string) {
  return str.split(",").map((s) => parseInt(s));
}

function parse(file: string) {
  const [rulesAsString, ordersAsString] = file.split("\n\n");

  const ruleStrings = rulesAsString.split("\n");
  const rules = ruleStrings.map((str) => parseRuleString(str));

  const orderStrings = ordersAsString.split("\n");
  const orders = orderStrings.map((str) => parseOrderString(str));

  return { rules, orders };
}

export function doTheWork(file: string) {
  const { rules, orders } = parse(file);

  const validOrders = orders.filter((order) => isValidOrder(order, rules));

  const middles = validOrders.map((order) => middle(order));

  return middles.reduce((a, b) => a + b, 0);
}
