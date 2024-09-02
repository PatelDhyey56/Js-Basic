import { createClient } from "redis";
import { REDIS_TTL } from "../../config/index.js";

const redis = createClient();

redis.on("error", (err) => console.log("Redis Client Error", err));

await redis.connect().then(() => console.log("Redis Connnected :)"));

async function setObjectArrayCache(
  listName,
  objectName,
  data,
  ttl = REDIS_TTL
) {
  try {
    for (let e of data) {
      await redis.hSet(`${objectName}${e.id}`, e, {
        EX: ttl,
        NX: true,
      });
      await redis.lPush(listName, `${objectName}${e.id}`, {
        EX: ttl,
        NX: true,
      });
    }
  } catch (err) {
    return null;
  }
}

async function getObjectArrayCache(ListName) {
  try {
    const keys = await redis.lRange(ListName, 0, -1);
    let data = [];
    for (let k of keys) {
      const ans = await redis.hGetAll(k);
      data.push(ans);
    }
    return data;
  } catch (err) {
    return null;
  }
}

async function getObjectCache(key) {
  try {
    let data = await redis.hGetAll(key);
    return Object.keys(data).length ? data : null;
  } catch (err) {
    return null;
  }
}

async function setObjectCache(key, data, ttl = REDIS_TTL) {
  try {
    let resData = await redis.hSet(key, data, {
      EX: ttl,
      NX: true,
    });
    return resData;
  } catch (err) {
    return null;
  }
}

async function removeCache(key, object = false, listName) {
  try {
    await redis.del(key);
    object && (await redis.lRem(listName, -1, key));
  } catch (err) {
    return null;
  }
}

export {
  setObjectArrayCache,
  getObjectArrayCache,
  getObjectCache,
  setObjectCache,
  removeCache,
};
