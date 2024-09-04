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
  addObjectCache,
  removeCache,
} from "../helpers/DbHelpers/redis.js";
import Messages from "../helpers/textHelpers/messages.js";
import redisHelper from "../helpers/textHelpers/redisHelper.js";
import jwt from "jsonwebtoken";

let result;
async function getPeople(req, res, next) {
  try {
    const cacheData = await getObjectArrayCache(redisHelper.People_See_List);
    result = !!cacheData.length ? cacheData : await selectTable("People");
    !cacheData.length &&
      (await setObjectArrayCache(
        redisHelper.People_See_List,
        redisHelper.People_See_Hash,
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
    const cacheData = await getObjectCache(
      `${redisHelper.People_See_Hash}${id}`
    );
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
  const bodyData = req.body;
  try {
    var token = jwt.sign(req.body, PASSKEY);
    addObjectCache(
      `${redisHelper.DB_People_Add_Hash}${Math.floor(
        Math.random() * 10000000000
      )}`,
      redisHelper.DB_People_Sets,
      bodyData
    );
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
  const bodyData = req.body;
  try {
    await selectById("People", id);
    addObjectCache(
      `${redisHelper.DB_People_Update_Hash}${id}`,
      redisHelper.DB_People_Sets,
      bodyData
    );
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
      `${redisHelper.People_See_Hash}${id}`,
      true,
      redisHelper.People_See_List
    );
    genralResponse(res, 200, {
      message: Messages.PEOPLE_DELETE,
    });
  } catch (e) {
    next(e);
  }
};

export { getPeople, getPeopleById, postPeople, putPeople, deletePeople };
