class Student {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    set fullName(name) {
        [this.firstName, this.lastName] = name.split(" ");
    }
}
let student = new Student("Dhyey", "Patel");
console.log(student.fullName);
student.fullName = "Ravi Patel";
console.log(student.fullName);
