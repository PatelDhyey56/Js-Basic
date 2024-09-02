const genralResponse = (res, status = 200, message = "") => {
  res.status(status).send(message);
};

const errorHandler = (err, req, res, next) => {
  if (!err) return next();
  res.status(400).send({ message: err.message || "Internal server error!!!" });
};

export { genralResponse, errorHandler };
