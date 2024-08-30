const { genralResponse } = require("../generalFunction");

const patterns = {
  textOnly: "^[a-zA-Z\\s]+$",
  numberOnly: "^\\d+$",
};

const postPeopleValid = {
  name: {
    required: true,
    pattern: patterns.textOnly,
  },
  age: {
    required: true,
    pattern: patterns.numberOnly,
  },
  gender: {
    required: true,
    pattern: patterns.textOnly,
  },
};

const putPeopleValid = {
  name: {
    required: false,
    pattern: patterns.textOnly,
  },
  age: {
    required: false,
    pattern: patterns.numberOnly,
  },
  gender: {
    required: false,
    pattern: patterns.textOnly,
  },
};

const postPeopleValidate = (req, res, next) => {
  let bodyData = req.body;
  let bodyKeys = Object.keys(req.body);
  for (let e in postPeopleValid) {
    bodyKeys.pop(e);
    if (
      postPeopleValid[e]?.required &&
      !bodyData[e]?.toString().match(postPeopleValid[e]?.pattern)
    )
      genralResponse(res, 400, {
        message: "Validation Error",
      });
  }
  if (bodyKeys.length > 0)
    return genralResponse(res, 400, {
      message: "Enter Valid Data",
    });
  next();
};

const putPeopleValidate = (req, res, next) => {
  let bodyData = req.body;
  let bodyKeys = Object.keys(req.body);
  for (let e in putPeopleValid) {
    if (bodyKeys.length == 0) return next();
    bodyKeys.pop(e);
    if (
      putPeopleValid[e]?.required &&
      !bodyData[e]?.toString().match(putPeopleValid[e]?.pattern)
    )
      genralResponse(res, 400, {
        message: "Validation Error",
      });
  }
  if (bodyKeys.length > 0)
    return genralResponse(res, 400, {
      message: "Enter Valid Data",
    });
  next();
};
module.exports = {
  postPeopleValidate,
  putPeopleValidate,
};
