let logic = 100;
let logicAnd = logic && 10;
console.log(logicAnd);

let logicOr = logic || 10;
console.log(logicOr);

logic = null;
let logicNullish = logic ?? 10;
console.log(logicNullish);
logic = undefined;
logicNullish = logic ?? 10;
console.log(logicNullish);
logic = 100;
logicNullish = logic ?? 10;
console.log(logicNullish);
