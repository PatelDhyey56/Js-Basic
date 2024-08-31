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

const getPeople = async (req, res) => {
  try {
    let data = await selectTable("People");
    genralResponse(res, 200, { message: "success", data });
  } catch (e) {
    console.log(e);
    genralResponse(res, 400, { message: "Error from Server side!!!" });
  }
};

const getPeopleById = async (req, res) => {
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
    genralResponse(res, 400, {
      message: "Please Enter valid Pass Key",
    });
  }
};

const postPeople = async (req, res) => {
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
    console.log(e);
    genralResponse(res, 400, { message: "Error from Server side!!!" });
  }
};

const putPeople = async (req, res) => {
  const { id } = req.params;
  const Body = Object.entries(req.body);
  const bodyValues = Object.values(req.body);
  try {
    if ((await selectById("People", id).length) === 0) throw error;
    let data = await updateData("People", id, Body, bodyValues);
    genralResponse(res, 200, {
      message: "Data Updated!!!",
      data,
    });
  } catch (e) {
    console.log(e);
    genralResponse(res, 400, { message: "Error from Server side!!!" });
  }
};

const deletePeople = async (req, res) => {
  const { id } = req.params;
  try {
    deleteData("People", id);
    genralResponse(res, 200, {
      message: "Data Deleted!!!",
    });
  } catch (e) {
    console.log(e);
    genralResponse(res, 400, { message: "Error from Server side!!!" });
  }
};

module.exports = {
  getPeople,
  getPeopleById,
  postPeople,
  putPeople,
  deletePeople,
};
