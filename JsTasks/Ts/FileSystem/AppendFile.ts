var fs = require("fs");
fs.appendFile("Example.txt", `Append File \n`, function (err, file) {
  if (err) throw err;
  console.log(`Append in File `);
});
