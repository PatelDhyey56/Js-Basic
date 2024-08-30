const { PASSKEY } = require("../config");
const { genralResponse } = require("../helpers/generalFunction");
var jwt = require("jsonwebtoken");

let PeopleList = [{ name: "dhyey", age: 18, gender: "male" }];

const getPeople = (req, res) => {
  genralResponse(res, 200, { message: "success", data: PeopleList });
};

const getPeopleById = (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  try {
    var verify = jwt.verify(token, PASSKEY);
    verify &&
      genralResponse(res, 200, {
        message: "success",
        data: PeopleList.filter((e, i) => i + 1 == id),
      });
  } catch (e) {
    genralResponse(res, 400, {
      message: "Please Enter valid Pass Key",
    });
  }
};

const postPeople = (req, res) => {
  PeopleList.push(req.body);
  var token = jwt.sign(req.body, PASSKEY);
  res.cookie("token", token);
  genralResponse(res, 200, {
    message: "success",
    YourToken: token,
    data: PeopleList,
  });
};

const putPeople = (req, res) => {
  const { id } = req.params;
  PeopleList = PeopleList.map((e, i) => (i + 1 == id ? req.body : e));
  genralResponse(res, 200, {
    message: "success",
    data: PeopleList,
  });
};

const deletePeople = (req, res) => {
  const { id } = req.params;
  PeopleList = PeopleList.filter((e, i) => i + 1 != id);
  genralResponse(res, 200, {
    message: "success",
    data: PeopleList,
  });
};

module.exports = {
  getPeople,
  getPeopleById,
  postPeople,
  putPeople,
  deletePeople,
};
