import { createClient } from "redis";
import { REDIS_DATA_ENTRY_TIME, REDIS_TTL } from "../../config/index.js";
import redisHelper from "../textHelpers/redisHelper.js";
import { addData, updateData } from "./DbQueryHelper.js";

const redis = createClient();

redis.on("error", (err) => console.log("Redis Client Error", err));

await redis.connect().then(() => console.log("Redis Connnected :)"));

let redisData;
async function setObjectArrayCache(
  listName,
  objectName,
  data,
  ttl = REDIS_TTL
) {
  try {
    data.map(async (e) => {
      await redis
        .multi()
        .hSet(`${objectName}${e.id}`, e)
        .lPush(listName, `${objectName}${e.id}`)
        .expire(`${objectName}${e.id}`, ttl)
        .exec();
    });
    await redis.expire(listName, ttl);
  } catch (err) {
    return null;
  }
}

async function getObjectArrayCache(ListName) {
  try {
    const keys = await redis.lRange(ListName, 0, -1);
    redisData = await Promise.all(
      keys.map(async (k) => await redis.hGetAll(k))
    );
    return redisData;
  } catch (err) {
    return null;
  }
}

async function getObjectCache(key) {
  try {
    redisData = await redis.hGetAll(key);
    return !!Object.keys(data).length ? redisData : null;
  } catch (err) {
    return null;
  }
}

async function setObjectCache(key, data, ttl = REDIS_TTL) {
  try {
    await redis.multi().hSet(key, data).expire(key, ttl).exec();
  } catch (err) {
    return null;
  }
}

async function addObjectCache(
  key,
  setName,
  data,
  ttl = +REDIS_DATA_ENTRY_TIME / 1000 + 600
) {
  try {
    await redis
      .multi()
      .hSet(key, data)
      .lPush(setName, key)
      .expire(key, ttl)
      .expire(setName, ttl)
      .exec();
  } catch (err) {
    return null;
  }
}

async function removeCache(key, object = false, listName = "") {
  try {
    object
      ? await redis.multi().del(key).lRem(listName, -1, key).exec()
      : await redis.del(key);
  } catch (err) {
    return null;
  }
}

setInterval(async (key = redisHelper.DB_People_Sets) => {
  try {
    let setLen = await redis.lLen(key);
    while (setLen > 0) {
      const popData = await redis.lIndex(key, setLen - 1);
      const data = await redis.hGetAll(popData);
      if (!!data) {
        const objEntries = Object.entries(data);
        const objValues = Object.values(data);
        popData.includes(redisHelper.DB_Update_People_Hash)
          ? await updateData(
              "People",
              +popData.split(":")[1],
              objEntries,
              objValues
            )
          : await addData("People", objEntries, objValues);
        await redis.multi().rPop(key).del(popData).exec();
      }
      setLen--;
      console.log(`Data Maintained By Redis!!!`);
    }
  } catch (err) {
    console.log(err);
  }
}, REDIS_DATA_ENTRY_TIME);

export {
  setObjectArrayCache,
  getObjectArrayCache,
  getObjectCache,
  setObjectCache,
  addObjectCache,
  removeCache,
};
