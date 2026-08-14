const { findUserByEmail } = require("../models/user.model.js");

const getUser = async (req, res, next) => {
  const user = req.user;
  const existingUser = await findUserByEmail(user.email);
  return res.status(200).send({ username: existingUser.username });
};

module.exports = { getUser };
