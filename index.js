import express from "express";
import { PORT } from "./config/index.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import router from "./routers/route.js";
import { errorHandler } from "./helpers/generalFunctions.js";
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server Listen at http://localhost:${PORT}`)
);
