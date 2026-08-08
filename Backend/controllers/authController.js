const User = require("../schemas/UserSchema.js");
const bcrypt = require("bcrypt");

function registerUser(req, res) {
  const { username, email, password } = req.body;
  console.log(username);

  // Required field validation
  if (!username) {
    return res.status(400).send({
      message: "Username is required",
    });
  }

  if (!email) {
    return res.status(400).send({
      message: "Email is required",
    });
  }

  if (!password) {
    return res.status(400).send({
      message: "Password is required",
    });
  }

  // Duplicate email

  User.findOne({ email })
    .then((existingEmail) => {
      if (existingEmail) {
        return res.status(409).send({
          message: "user with this email already exists, please login",
        });
      }
      return User.findOne({ username });
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
      return User.create({ username, email, password: hashedPassword });
    })
    .then((user) => {
      return res.status(201).send({ id: user._id, email });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({
        message: err.message,
      });
    });
}

module.exports = { registerUser };
