const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/auth.controller.js");
const {
  validateRegister,
  validateLogin,
} = require("../middleware/validationMiddleware.js");
const protect = require("../middleware/authMiddleware.js");
const router = express.Router();

router.post("/register", validateRegister, registerUser);

router.post("/login", validateLogin, loginUser);

router.post("/logout", protect, logoutUser);

module.exports = router;
