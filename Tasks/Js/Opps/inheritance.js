class Perent {
    constructor(name, age, type) {
        this.name = name;
        this.age = age;
        this.type = type;
    }
    information() {
        console.log(`this is Perent class`);
    }
    about() {
        console.log(`name : ${this.name} age : ${this.age}`);
    }
}
class Child extends Perent {
    constructor(name, age, type, fav) {
        super(name, age, type);
        this.fav = fav;
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
