class Perent {
  constructor(
    private name: string,
    private age: number,
    private type: string
  ) {}

  information() {
    console.log(`this is Perent class`);
  }
  about() {
    console.log(`name : ${this.name} age : ${this.age}`);
  }
}

class Child extends Perent {
  constructor(name: string, age: number, type: string, private fav: string) {
    super(name, age, type);
  }
  information() {
    console.log(`this is child class`);
  }
}
// ? Main Class
let perent = new Perent("dhyey", 18, "male");
console.log(perent);

// ? child class
let child = new Child("son", 10, "male", "cricket");
console.log(child);
console.log(child.about());
console.log(child.information());
