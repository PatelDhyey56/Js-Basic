import { createClient } from "redis";
import { REDIS_TTL } from "../config/index.js";

const redis = createClient();

redis.on("error", (err) => console.log("Redis Client Error", err));

await redis.connect().then(() => console.log("Redis Connnected :)"));

async function getCache(key) {
  try {
    const data = await redis.get(key);
    return data;
  } catch (err) {
    return null;
  }
}
function setStringCache(key, data, ttl = REDIS_TTL) {
  try {
    redis.set(key, JSON.stringify(data), {
      EX: ttl,
      NX: true,
    });
  } catch (err) {
    return null;
  }
}

function removeCache(key) {
  try {
    redis.del(key);
  } catch (err) {
    return null;
  }
}

export { getCache, setStringCache, removeCache };
