let age = 20;
if (age > 18) {
  console.log("You can Drive");
} else if (age < 18 && age > 10) {
  console.log("You can Drive safely!!!");
} else {
  console.log("can't Drive");
}

age > 18
  ? console.log("You can Drive")
  : age < 18 && age > 10
  ? console.log("You can Drive safely!!!")
  : console.log("can't Drive");
