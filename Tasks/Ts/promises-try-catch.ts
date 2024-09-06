let Myage = 21;
let promises = new Promise((resolve, reject) =>
  Myage >= 18 ? resolve("Drive :)") : reject("Drive But Safely")
);
let promises2 = new Promise((resolve, reject) =>
  Myage > 15 && Myage < 18 ? reject("Drive Safely") : resolve(promises)
);
let promises3 = new Promise((resolve, reject) =>
  Myage > 10 ? resolve(promises2) : reject("Drive :)")
);
promises3
  .then((p3) => {
    console.log(p3);
  })
  .catch((e) => console.log(`\nError : ${e}`));

console.log("Try Catch -->\n");
(async function Try_Catch() {
  try {
    let data1 = await promises3;
    console.log(data1);
  } catch (e) {
    console.log(e);
  } finally {
    console.log("finnally");
  }
})();
