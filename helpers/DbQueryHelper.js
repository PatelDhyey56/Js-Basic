import { queryRun } from "../config/db.js";

const selectTable = async (tableName) => {
  return await queryRun(`SELECT * FROM "${tableName}"`);
};

const selectById = async (tableName, id) => {
  let checkID = await queryRun(`SELECT * FROM "${tableName}" where id=${id}`);
  if (checkID.length === 0) throw new Error("User not found!!!");
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

export { selectTable, selectById, updateData, deleteData, addData };
