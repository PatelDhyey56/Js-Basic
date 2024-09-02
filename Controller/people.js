import { PASSKEY } from "../config/index.js";
import {
  selectTable,
  selectById,
  addData,
  updateData,
  deleteData,
} from "../helpers/DbQueryHelper.js";
import { genralResponse } from "../helpers/generalFunction.js";
import jwt from "jsonwebtoken";
import { getCache, setStringCache, removeCache } from "../helpers/redis.js";
import Messages from "../helpers/messages.js";

let result;
async function getPeople(req, res, next) {
  try {
    const cacheData = await getCache("AllPeeple");
    result = cacheData ? JSON.parse(cacheData) : await selectTable("People");
    !cacheData && (await setStringCache("AllPeeple", result));
    genralResponse(res, 200, { message: Messages.ALL_DATA, data: result });
  } catch (e) {
    next(e);
  }
}

const getPeopleById = async (req, res, next) => {
  const { id } = req.params;
  const { token } = req.cookies;
  try {
    let verify = jwt.verify(token, PASSKEY);
    if (!verify) throw new Error("Pelease Validate Your Profile!!!");
    const cacheData = await getCache("AllPeeple");
    result = cacheData
      ? JSON.parse(cacheData).filter((e) => e.id == id)
      : await selectById("People", id);
    genralResponse(res, 200, {
      message: Messages.PEOPLE_GET,
      data: result,
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
    removeCache("AllPeeple");
    res.cookie("token", token);
    genralResponse(res, 200, {
      message: Messages.PEOPLE_CREATED,
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
    removeCache("AllPeeple");
    genralResponse(res, 200, {
      message: Messages.PEOPLE_UPDATED,
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
    removeCache("AllPeeple");
    genralResponse(res, 200, {
      message: Messages.PEOPLE_DELETE,
    });
  } catch (e) {
    next(e);
  }
};

export { getPeople, getPeopleById, postPeople, putPeople, deletePeople };
