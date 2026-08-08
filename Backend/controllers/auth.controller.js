const bcrypt = require("bcrypt");
const {
  findUserByEmail,
  findUserByUsername,
  createUser,
} = require("../models/auth.model.js");

function registerUser(req, res) {
  // Duplicate email
  const { username, email, password } = req.body;
  findUserByEmail(email)
    .then((existingEmail) => {
      if (existingEmail) {
        return res.status(409).send({
          message: "user with this email already exists, please login",
        });
      }
      return findUserByUsername(username);
    })
    .then((existingUsername) => {
      if (existingUsername) {
        return res.status(409).send({
          message: "username already taken, please try different username",
        });
      }

      return bcrypt.hash(password, 10);
    })
    .then((hashedPassword) => {
      return createUser({ username, email, password: hashedPassword });
    })
    .then((user) => {
      return res.status(201).send({ id: user._id, email: user.email });
    })
    .catch((err) => next(err));
}

module.exports = { registerUser };
