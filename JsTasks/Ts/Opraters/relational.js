const relational = (a, b = 0) => {
    return {
        gtr: () => a > b,
        les: () => a < b,
        gtrEqual: () => a >= b,
        equal: () => a == b,
        typeCheck: () => a === b,
        typeWithNOtEqual: () => a !== b,
    };
};
console.log(relational(3, 2).gtr());
console.log(relational(3, 2).les());
console.log(relational(3, 2).gtrEqual());
console.log(relational(3, 2).equal());
console.log(relational(3, 2).typeCheck());
console.log(relational(3, 2).typeWithNOtEqual());
