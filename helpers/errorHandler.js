export const errorHandler = (err, req, res, next) => {
  if (!err) return next();
  res.status(500).send({ message: err.message || "Internal server error!!!" });
};
