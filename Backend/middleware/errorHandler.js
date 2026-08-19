function errorHandler(err, req, res, next) {
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "CastError") {
    return res.status(404).json({ message: "Resource not found" });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({ message: `${field} already in use` });
  }

  console.log(err.stack);
  res.status(500).send({ message: "Internal Server Error" });
}

module.exports = errorHandler;
