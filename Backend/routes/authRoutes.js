const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  sendResetToken,
  updatePassword,
} = require("../controllers/auth.controller.js");
const {
  validateRegister,
  validateLogin,
  validatePassword,
} = require("../middleware/validationMiddleware.js");
const protect = require("../middleware/authMiddleware.js");
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many requests. try agin after 15 mins",
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: "Too many requests. try agin after 15 mins",
});

const router = express.Router();

router.post("/register", validateRegister, registerUser);

router.post("/login", loginLimiter, validateLogin, loginUser);

router.post("/logout", protect, logoutUser);

router.post("/forgot-password", forgotPasswordLimiter, sendResetToken);

router.post("/reset-password", validatePassword, updatePassword);

module.exports = router;
