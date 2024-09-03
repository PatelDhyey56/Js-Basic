import { PASSKEY } from "../config/index.js";
import {
  selectTable,
  selectById,
  addData,
  updateData,
  deleteData,
} from "../helpers/DbHelpers/DbQueryHelper.js";
import { genralResponse } from "../helpers/generalFunctions.js";
import {
  setObjectArrayCache,
  getObjectArrayCache,
  getObjectCache,
  setObjectCache,
  removeCache,
} from "../helpers/DbHelpers/redis.js";
import Messages from "../helpers/textHelpers/messages.js";
import redisHelper from "../helpers/textHelpers/redisHelper.js";
import jwt from "jsonwebtoken";

let result;
async function getPeople(req, res, next) {
  try {
    const cacheData = await getObjectArrayCache(redisHelper.PeopleList);
    result = !!cacheData.length ? cacheData : await selectTable("People");
    !cacheData.length &&
      (await setObjectArrayCache(
        redisHelper.PeopleList,
        redisHelper.PeopleHash,
        result
      ));
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
    if (!verify) throw new Error(Messages.PEOPLE_VALIDATE);
    const cacheData = await getObjectCache(`${redisHelper.PeopleHash}${id}`);
    result = cacheData ? cacheData : await selectById("People", id);
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
    await setObjectCache(`${redisHelper.PeopleHash}${id}`, req.body);
    genralResponse(res, 200, {
      message: Messages.PEOPLE_UPDATED,
      data,
    });
  } catch (e) {
    next(e);
  }
};

const deletePeople = async (req, res, next) => {
  const { id } = req.params;
  try {
    await selectById("People", id);
    deleteData("People", id);
    await removeCache(
      `${redisHelper.PeopleHash}${id}`,
      true,
      redisHelper.PeopleList
    );
    genralResponse(res, 200, {
      message: Messages.PEOPLE_DELETE,
    });
  } catch (e) {
    next(e);
  }
};

export { getPeople, getPeopleById, postPeople, putPeople, deletePeople };
