import { postPeopleValid, putPeopleValid } from "./validators.js";
import Messages from "../textHelpers/messages.js";

const postPeopleValidate = (req, res, next) => {
  let bodyData = req.body;
  let bodyKeys = Object.keys(req.body);
  for (let e in postPeopleValid) {
    bodyKeys.pop(e);
    if (
      postPeopleValid[e]?.required &&
      !bodyData[e]?.toString().match(postPeopleValid[e]?.pattern)
    )
      throw new Error(`Please Enter Valid ${e}`);
  }
  if (!!bodyKeys.length) throw new Error(Messages.VALIDATION_ERROR);
  next();
};

const putPeopleValidate = (req, res, next) => {
  let bodyData = req.body;
  let bodyKeys = Object.keys(req.body);
  for (let e in putPeopleValid) {
    if (!bodyKeys.length) return next();
    bodyKeys.pop(e);
    if (
      putPeopleValid[e]?.required &&
      !bodyData[e]?.toString().match(putPeopleValid[e]?.pattern)
    )
      throw new Error(`Please Enter Valid ${e}`);
  }
  if (!!bodyKeys.length) throw new Error(Messages.VALIDATION_ERROR);
  next();
};

export { postPeopleValidate, putPeopleValidate };
