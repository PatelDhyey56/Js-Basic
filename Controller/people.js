const { PASSKEY } = require("../config");
const {
  selectTable,
  selectById,
  createData,
  updateData,
  deleteData,
} = require("../helpers/DbQueryHelper");
const { genralResponse } = require("../helpers/generalFunction");
var jwt = require("jsonwebtoken");

const getPeople = async (req, res, next) => {
  try {
    let data = await selectTable("People");
    genralResponse(res, 200, { message: "success", data });
  } catch (e) {
    next(e);
  }
};

const getPeopleById = async (req, res, next) => {
  const { id } = req.params;
  const { token } = req.cookies;
  try {
    let verify = jwt.verify(token, PASSKEY);
    let data = await selectById("People", id);
    verify &&
      genralResponse(res, 200, {
        message: "success",
        data,
      });
  } catch (e) {
    next(e);
  }
};

const postPeople = async (req, res, next) => {
  const Body = Object.entries(req.body);
  const bodyValues = Object.values(req.body);
  try {
    await createData("People", Body, bodyValues);
    var token = jwt.sign(req.body, PASSKEY);
    res.cookie("token", token);
    genralResponse(res, 200, {
      message: "Data Created!!",
      YourToken: token,
    });
  } catch (e) {
    next(e);
  }
};

const putPeople = async (req, res, next) => {
  const { id } = req.params;
  const Body = Object.entries(req.body);
  const bodyValues = Object.values(req.body);
  try {
    await selectById("People", id);
    let data = await updateData("People", id, Body, bodyValues);
    genralResponse(res, 200, {
      message: "Data Updated!!!",
      data,
    });
  } catch (e) {
    next(e);
  }
};

const deletePeople = async (req, res) => {
  const { id } = req.params;
  try {
    await selectById("People", id);
    deleteData("People", id);
    genralResponse(res, 200, {
      message: "Data Deleted!!!",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getPeople,
  getPeopleById,
  postPeople,
  putPeople,
  deletePeople,
};
