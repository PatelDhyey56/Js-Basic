import * as dotenv from "dotenv";
dotenv.config();
const {
  PORT,
  DB_USER,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_PASSWORD,
  PASSKEY,
  REDIS_TTL,
} = process.env;
export {
  PORT,
  DB_USER,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_PASSWORD,
  PASSKEY,
  REDIS_TTL,
};
