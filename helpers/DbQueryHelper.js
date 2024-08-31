const { queryRun } = require("../config/db");

const selectTable = async (tableName) => {
  return await queryRun(`SELECT * FROM public."${tableName}"`);
};

const selectById = async (tableName, id) => {
  return await queryRun(`SELECT * FROM public."${tableName}" where id=${id}`);
};

const createData = async (tableName, body, bodyValues) => {
  let query = `INSERT INTO public."${tableName}"`;
  let col = "(";
  let val = "(";
  let no = 1;
  for (e of body) {
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
  let query = `Update public."${tableName}" SET `;
  let no = 1;
  for (e of body) {
    query += `${e[0]}= $${no}`;
    no++;
    if (body.length >= no) query += ", ";
  }
  query += `Where id=${id};`;
  return await queryRun(query, bodyValues);
};

const deleteData = async (tableName, id) => {
  return await queryRun(`DELETE FROM public."${tableName}" WHERE id = ${id};`);
};

module.exports = {
  selectTable,
  selectById,
  createData,
  updateData,
  deleteData,
};
