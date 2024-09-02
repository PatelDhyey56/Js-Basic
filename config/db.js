import postgresql from "pg";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./index.js";
const { Pool } = postgresql;

const db = new Pool({
  user: DB_USER,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_DATABASE,
  password: DB_PASSWORD,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Db Connected :)");
});

const queryRun = (sql, values = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result.rows);
    });
  });
};

export { db, queryRun };
