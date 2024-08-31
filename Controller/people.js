import env from "../config/index.js";
const { PASSKEY } = env;
import {
  selectTable,
  selectById,
  addData,
  updateData,
  deleteData,
} from "../helpers/DbQueryHelper.js";
import { genralResponse } from "../helpers/generalFunction.js";
import jwt from "jsonwebtoken";

async function getPeople(req, res, next) {
  try {
    let data = await selectTable("People");
    genralResponse(res, 200, { message: "success", data });
  } catch (e) {
    next(e);
  }
}

const getPeopleById = async (req, res, next) => {
  const { id } = req.params;
  const { token } = req.cookies;
  try {
    let verify = jwt.verify(token, PASSKEY);
    let data = await selectById("People", id);
    if (!verify) throw new Error("Pelease Validate Your Profile!!!");
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
    await addData("People", Body, bodyValues);
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

export { getPeople, getPeopleById, postPeople, putPeople, deletePeople };
