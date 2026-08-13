const express = require("express");
const {
  registerUser,
  loginUser,
} = require("../controllers/auth.controller.js");
const {
  validateRegister,
  validateLogin,
} = require("../middleware/validationMiddleware.js");
const router = express.Router();

router.post("/register", validateRegister, registerUser);

router.post("/login", validateLogin, loginUser);

module.exports = router;
