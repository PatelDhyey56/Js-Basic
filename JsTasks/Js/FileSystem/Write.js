var fs = require("fs");
fs.writeFile("Example.txt", `Write File`, function (err, file) {
    if (err)
        throw err;
    console.log(`Write in File!`);
});
