//? Globle scope
let globle = 10;
{
    console.log(globle);
}
console.log(globle);
//? bracket scope
{
    let Bracket_let = 10;
    var Bracket_var = 20;
    console.log(Bracket_var);
    console.log(Bracket_let);
}
console.log(Bracket_var);
//! console.log(Bracket_let);
//?function Scope
function fun() {
    let fun_let = 30;
    var fun_var = 40;
    console.log(fun_let);
    console.log(fun_var);
}
