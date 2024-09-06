//?var Globle scope
/**
 * let a; --> is Undefined
 * let a=null; --> is null equal to 0
 * number --> 10
 * string --> "string"
 * boolean --> true
 * object --> let object = {
    name: "vishal",
    age: 18,
    about() {
    console.log(`this is ${this.name} and he is ${this.age} year old`);
    },
  * array --> [1,2,3,4,5]
};
 */
var a: number = 10;
// "hii" not asign to a
//not asign this things
//! let b:string=50

//? let limitited scope
{
  let b: string = "50";
}
//! console.log(b);

//? const can not chenge it
//! const c;
const c: boolean = true;
//! c=false
//can not chenge to other value
