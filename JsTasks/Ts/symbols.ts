const symbol = Symbol();
const symbol1 = Symbol("abcd");
console.log(symbol);
console.log(symbol1);
console.log(Symbol("abcd") === Symbol("abcd"));
console.log(Symbol.for("abcd") === Symbol("abcd"));
console.log(Symbol.for("abcd") === Symbol.for("abcd"));

let symDemo = Symbol.for("name");
console.log(Symbol.keyFor(symDemo));
