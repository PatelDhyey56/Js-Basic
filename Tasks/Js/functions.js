// ? Normal function
function sum(a, b) {
    return a + b;
}
//? or We create like this also
let sumOr = function (a, b) {
    return a + b;
};
console.log(`sum :${sum(1, 2)}`);
console.log(`sumOr :${sumOr(1, 2)}`);
// ? arrow function
const divide = (a, b) => (a > b ? a / b : b / a);
console.log(`divide : ${divide(10, 2)}`);
console.log(`divide : ${divide(2, 10)}`);
//? arguments and perametersc with default Values
const mul = (a = 5, b = 5) => a * b + a + b;
console.log(`multiply with arg : ${mul(10, 2)}`);
console.log(`multiply with 1 arg: ${mul(10)}`);
console.log(`multiply with no arg: ${mul()}`);
console.log(`multiply with null and undefined: ${mul(null, undefined)}\n`);
//? Recursive Function
function Fac(num) {
    if (num === 0)
        return 1;
    return num * Fac(num - 1);
}
console.log(`factorial is : ${Fac(5)}\n`);
