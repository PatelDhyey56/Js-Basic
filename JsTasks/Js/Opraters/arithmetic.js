const arethmetic = (a, b = 0) => {
    return {
        add: () => a + b,
        Subtraction: () => a - b,
        Division: () => a / b,
        modulo: () => a % b,
        pow: () => a ** b,
        incr: () => ++a,
        dicr: () => --a,
    };
};
console.log(arethmetic(3, 2).add());
console.log(arethmetic(3, 2).Subtraction());
console.log(arethmetic(3, 2).Division());
console.log(arethmetic(3, 2).modulo());
console.log(arethmetic(3, 2).pow());
console.log(arethmetic(3, 2).incr());
console.log(arethmetic(3, 2).dicr());
