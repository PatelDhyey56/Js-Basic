import { PASSKEY } from "../config/index.js";
import {
  selectTable,
  selectById,
  deleteData,
  selectTableFirstAndLastId,
} from "../helpers/DbHelpers/DbQueryHelper.js";
import { genralResponse } from "../helpers/generalFunctions.js";
import {
  setObjectArrayCache,
  getObjectArrayCache,
  getObjectCache,
  addObjectCache,
  removeCache,
} from "../helpers/DbHelpers/redis.js";
import Messages from "../helpers/textHelpers/messages.js";
import redisHelper from "../helpers/textHelpers/redisHelper.js";
import jwt from "jsonwebtoken";

let result, cacheData;

async function getPeople(req, res, next) {
  try {
    cacheData = await getObjectArrayCache(redisHelper.See_People_List);
    result = !!cacheData?.length ? cacheData : await selectTable("People");
    !cacheData?.length &&
      (await setObjectArrayCache(
        redisHelper.See_People_List,
        redisHelper.See_People_Hash,
        result
      ));
    genralResponse(res, 200, { message: Messages.ALL_DATA, data: result });
  } catch (e) {
    next(e);
  }
}

let pageFirst = 0,
  pageLast = 0;
const { first, last } = await selectTableFirstAndLastId("People");
async function getPeopleWithPegination(req, res, next) {
  try {
    let {
      mode = true,
      limit = 10,
      Id = pageFirst,
      orderBy = "asc",
    } = req.query;
    console.log(Boolean(mode.toBool()));
    result = await selectTable(
      "People",
      limit,
      mode == "true" ? pageLast : Id,
      mode == "true" ? true : false,
      orderBy
    );
    pageFirst = result[orderBy === "asc" ? 0 : result.length - 1]?.id || 0;
    pageLast = result[orderBy === "asc" ? result.length - 1 : 0]?.id || 0;
    genralResponse(res, 200, {
      message: Messages.ALL_DATA,
      previous: pageFirst > first ? true : false,
      next: pageLast < last ? true : false,
      data: result,
    });
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
    cacheData = await getObjectCache(`${redisHelper.See_People_Hash}${id}`);
    result = cacheData ? cacheData : await selectById("People", id);
    !cacheData &&
      setObjectArrayCache(
        redisHelper.See_People_List,
        redisHelper.See_People_Hash,
        result
      );
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
      `${redisHelper.DB_Add_People_Hash}${Math.floor(
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
      `${redisHelper.DB_Update_People_Hash}${id}`,
      redisHelper.DB_People_Sets,
      bodyData
    );
    genralResponse(res, 200, {
      message: Messages.PEOPLE_UPDATED,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const deletePeople = async (req, res, next) => {
  const { id } = req.params;
  try {
    await selectById("People", id);
    deleteData("People", id);
    await removeCache(
      `${redisHelper.See_People_Hash}${id}`,
      true,
      redisHelper.See_People_List
    );
    genralResponse(res, 200, {
      message: Messages.PEOPLE_DELETE,
    });
  } catch (e) {
    next(e);
  }
};

export {
  getPeople,
  getPeopleWithPegination,
  getPeopleById,
  postPeople,
  putPeople,
  deletePeople,
};
