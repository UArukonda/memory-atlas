const express = require("express");
const { registerUser } = require("../controllers/auth.controller.js");
const { validateRegister } = require("../utils/validateRegister.js");
const router = express.Router();

router.post("/register", validateRegister, registerUser);

module.exports = router;
