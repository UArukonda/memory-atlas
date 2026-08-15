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
const router = express.Router();

router.post("/register", validateRegister, registerUser);

router.post("/login", validateLogin, loginUser);

router.post("/logout", protect, logoutUser);

router.post("/forgot-password", sendResetToken);

router.post("/reset-password", validatePassword, updatePassword);

module.exports = router;
