import * as dotenv from "dotenv";
dotenv.config();
const { PORT, PASSKEY } = process.env;
export default { PORT, PASSKEY };
