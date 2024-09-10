import { queryRun } from "../../config/db.js";
import Messages from "../textHelpers/messages.js";

const selectTable = async (
  tableName,
  limit,
  lastId = 0,
  next = true,
  order = "asc"
) => {
  return await queryRun(
    `SELECT * FROM  ( SELECT * FROM "${tableName}" 
    where id ${next ? ">" : "<"} ${lastId} order by id 
    ${next ? "asc" : "desc"} ${limit ? `limit ${limit}` : ""} )
    Newt order by id ${order} `
  );
};

const selectTableFirstAndLastId = async (tableName) => {
  let first = await queryRun(`SELECT id FROM "${tableName}" limit 1`);
  let last = await queryRun(
    `SELECT id FROM "${tableName}" order by id desc limit 1`
  );
  return { first: first[0].id, last: last[0].id };
};

const selectById = async (tableName, id) => {
  let checkID = await queryRun(`SELECT * FROM "${tableName}" where id=${id}`);
  if (checkID.length === 0) throw new Error(Messages.PEOPLE_VALIDATE);
  return checkID;
};

const addData = async (tableName, body, bodyValues) => {
  let query = `INSERT INTO "${tableName}"`;
  let col = "(";
  let val = "(";
  let no = 1;
  for (let e of body) {
    col += `${e[0]}`;
    val += `$${no}`;
    no++;
    if (body.length >= no) {
      col += ", ";
      val += ", ";
    } else {
      col += ")";
      val += ")";
    }
  }
  query += `${col} VALUES ${val}`;
  return await queryRun(query, bodyValues);
};

const updateData = async (tableName, id, body, bodyValues) => {
  let query = `Update "${tableName}" SET `;
  let no = 1;
  for (let e of body) {
    query += `${e[0]}= $${no}`;
    no++;
    if (body.length >= no) query += ", ";
  }
  query += `Where id=${id};`;
  return await queryRun(query, bodyValues);
};

const deleteData = async (tableName, id) => {
  return await queryRun(`DELETE FROM "${tableName}" WHERE id = ${id};`);
};

export {
  selectTable,
  selectById,
  updateData,
  deleteData,
  addData,
  selectTableFirstAndLastId,
};
