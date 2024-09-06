//? closures
function closuresFunc(a: number) {
  let c: number = 5;
  return (b: number) => {
    console.log(a + b);
    console.log(`inner value is --> ${c}`);
  };
}
const closure = closuresFunc(2);
console.log(`inner function call --> ${closure(2)}`);

function closuresFuncWithObject(a: number) {
  return {
    add: (b: number) => {
      console.log(a + b);
    },
    mul: (b: number) => {
      console.log(a * b);
    },
  };
}

const closureWithObj = closuresFuncWithObject(3);
console.log(`inner Object Add function call --> ${closureWithObj.add(2)}`);
console.log(`inner Object Multiply function call --> ${closureWithObj.mul(2)}`);
