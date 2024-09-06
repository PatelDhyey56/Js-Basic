// ? useing new keyWord
let array = new Array(9).fill(null);
console.log(array);
let NArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(NArray);
console.log(NArray.pop());
console.log(NArray.push(10));
console.log(NArray.shift());
console.log(NArray.unshift(1));
//? methods
console.log(`Narray length is : ${NArray.length}`);
NArray.forEach((e, i) => console.log(`index : ${i} --> ele : ${e}`));
console.log(NArray.map((e) => e * 2));
console.log(NArray.filter((e) => e > 5));
console.log(NArray.reduce((e, ac) => e + ac, 0));
//? Prototypes
// Array.prototype.mulBy2 = NArray.map((e) => e * 2);
//? set
let Sarray = [1, 2, 2, 3, 5, 4, 1, 1, 1, 5];
let set = [...new Set(Sarray)];
console.log(set);
console.log(set.sort());
