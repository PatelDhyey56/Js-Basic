let Myage = 10;
let promises = new Promise((resolve, reject) =>
  Myage > 18 ? resolve("Drive") : reject("Dont Drive")
);
promises.then((a) => console.log(a)).catch((e) => console.log(e));

console.log("Try Catch -->\n");
async function Try_Catch() {
  try {
    let data = await promises;
    console.log(data);
  } catch (e) {
    console.log(e);
  } finally {
    console.log("finnally");
  }
}
Try_Catch();
