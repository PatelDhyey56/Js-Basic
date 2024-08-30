const genralResponse = (res, status = 200, message = "") => {
  res.status(status).send(message);
};
module.exports = { genralResponse };
