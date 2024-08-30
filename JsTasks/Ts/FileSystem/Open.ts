var fs = require("fs");

fs.open("Example.txt", "w", function (err, file) {
  if (err) throw err;
  console.log("Saved!");
});
