const express = require("express");
const { PORT } = require("./config/index");
const router = require("./routers/route");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(router);

app.use((err, req, res, next) => {
  if (!err) return next();
  res.status(500).send({ message: err.message || "Internal server error!!!" });
});

app.listen(PORT, () => console.log(`server Listen at ${PORT}`));
