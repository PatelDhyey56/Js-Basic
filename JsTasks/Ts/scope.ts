//? Globle scope
let globle: number = 10;
{
  console.log(globle);
}
console.log(globle);

//? bracket scope
{
  let Bracket_let: number = 10;
  var Bracket_var: number = 20;
  console.log(Bracket_var);
  console.log(Bracket_let);
}
console.log(Bracket_var);
//! console.log(Bracket_let);

//?function Scope
function fun() {
  let fun_let: number = 30;
  var fun_var: number = 40;
  console.log(fun_let);
  console.log(fun_var);
}
