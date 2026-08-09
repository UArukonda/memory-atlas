const bcrypt = require("bcrypt");
const {
  findUserByEmail,
  findUserByUsername,
  createUser,
} = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

async function registerUser(req, res, next) {
  try {
    const { username, email, password } = req.body;

    const existingEmail = await findUserByEmail(email);

    if (existingEmail) {
      return res.status(409).send({
        message: "user with this email already exists, please login",
      });
    }

    const existingUsername = await findUserByUsername(username);

    if (existingUsername) {
      return res.status(409).send({
        message: "username already taken, please try different username",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).send({
      id: newUser._id,
      email: newUser.email,
      message: "Registration successful. Please log in.",
    });
  } catch (err) {
    next(err);
  }
}

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      return res.status(404).send({
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).send({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        username: existingUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res.status(200).send({
      token,
      user: {
        email: existingUser.email,
        id: existingUser._id,
        username: existingUser.username,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { registerUser, loginUser };
