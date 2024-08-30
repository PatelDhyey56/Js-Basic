let special = [1, 2, 3, 4, 5, 6];
let special2 = [1, 2, 3, 4, 5, 6];
console.log(special);
console.log(...special);
console.log([...special, ...special2]);
console.log([...new Set([...special, ...special2])]);
let [first, second, ...rest] = special;
console.log(`first --> ${first} second--> ${second} rest--> ${rest}`);
