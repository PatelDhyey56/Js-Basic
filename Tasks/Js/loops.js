"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ?Normal loops
for (let i = 0; i < 10; i++) {
    console.log(i);
}
let num = 11;
while (num >= 20) {
    console.log(num);
    num++;
}
do {
    console.log(num);
    num++;
} while (num >= 25);
//? additional loops
let obj = { name: "dhyey", age: 18, gender: "male" };
let arr = ["dhyey", "dev", "ravi", "yash"];
// ? In-loop for return index
for (let e in obj) {
    console.log(e);
}
// ? of-loop for return index
for (let e of arr) {
    console.log(e);
}
