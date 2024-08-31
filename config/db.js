const { Client } = require("pg");
const db = new Client({
  user: "root",
  host: "localhost",
  database: "cittagames",
  password: "root@123",
  port: 5432,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Db Connected!!!");
});

const queryRun = (sql, values = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result.rows);
    });
  });
};

module.exports = { db, queryRun };
