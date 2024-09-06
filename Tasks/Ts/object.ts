// ? use new keyword
let newObject: any = new Object();
newObject.name = "saras";
newObject.age = 18;
console.log(newObject);

//? normal use
let object = {
  name: "vishal",
  age: 18,
  about() {
    console.log(`this is ${this.name} and he is ${this.age} year old`);
  },
};
console.log(object);
console.log(object.name);
delete object?.name;
console.log(object.name);
console.log(object.about());
console.log(Object.keys(object));
// console.log(Object.values(object));
// console.log(Object.entries(object));
Object.freeze(object);
object.name = "Jay";
console.log(object);

// ? Map
// let map = new Map([
//   ["name", "map"],
//   ["val", 10],
// ]);
// console.log(map);
// map.set("type", "map");
// console.log(map.get("type"));

//? using constructure
// function Person(first, last, age) {
//   this.firstName = first;
//   this.lastName = last;
//   this.age = age;
// }

// const me = new Person("Mukesh", "Patel", 50);
// console.log(me);
