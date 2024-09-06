const callBack = (fun) => {
  setTimeout(() => {
    console.log("Main Function!!!");
  }, 1000);
  fun();
};
callBack(() => {
  console.log("Call Back!!!");
});
