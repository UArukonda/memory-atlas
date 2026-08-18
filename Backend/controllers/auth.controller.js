const bcrypt = require("bcrypt");
const {
  findUserByEmail,
  findUserByUsername,
  createUser,
  comparePassword,
  updateUserData,
} = require("../repositories/user.repository.js");
const jwt = require("jsonwebtoken");
const transporter = require("../services/emailService.js");

async function registerUser(req, res, next) {
  try {
    const { username, email, password } = req.body;

    const existingEmail = await findUserByEmail(email);

    if (existingEmail) {
      return res.status(409).send({
        message: "User with this email already exists, please login",
      });
    }

    const existingUsername = await findUserByUsername(username);

    if (existingUsername) {
      return res.status(409).send({
        message: "Username already taken, please try different username",
      });
    }

    const newUser = await createUser({
      username,
      email,
      password,
    });
    return res.status(201).send({
      id: newUser._id,
      email: newUser.email,
      message: "Registration successful. Please log in.",
    });
  } catch (err) {
    console.log(err);
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

    const isMatch = await comparePassword(existingUser, password);

    if (!isMatch) {
      return res.status(401).send({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).send({
      message: "Login successful",
      email: existingUser.email,
      username: existingUser.username,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

function logoutUser(req, res, next) {
  res.clearCookie("token", { path: "/", httpOnly: true });
  return res.status(200).send({ message: "Logout successful" });
}

async function sendResetToken(req, res, next) {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const passwordResetToken = await jwt.sign(
      { email: user.email, purpose: "password reset" },
      process.env.JWT_RESET_SECRET,
      {
        expiresIn: "15m",
      },
    );

    const resetLink = `http://localhost:5173/reset-password?token=${passwordResetToken}`;

    const info = await transporter.sendMail({
      from: `${process.env.EMAIL_FROM} a@b.c`, //services like gmail and others override from address to your smtp_user
      to: user.email,
      subject: "password reset - from memory atlas",
      text: `Click the link below to reset your password ${resetLink}`, //if client dont support html then text is shown
      // html: `<h1>this is a test email</h1>`, // if supports html then it is rendered
    });

    return res.status(200).send({
      message: "Reset email sent",
      token: passwordResetToken,
    });
  } catch (err) {
    console.log("error while sending email:", err.message);
    next(err);
  }
}

async function updatePassword(req, res, next) {
  const { token, newPassword } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Reset token is required" });
  }
  if (!newPassword) {
    return res.status(400).json({ message: "New password is required" });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_RESET_SECRET);
    const userData = await findUserByEmail(user.email);
    await updateUserData(userData, "password", newPassword);
    return res.status(200).send({ message: "Password reset successful" });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Reset token has expired",
      });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid reset token",
      });
    }
    next(err);
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  sendResetToken,
  updatePassword,
};
