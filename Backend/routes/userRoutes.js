const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const { getUser } = require("../controllers/user.controller.js");

const router = express.Router();
router.use(protect);

router.get("/me", getUser);

module.exports = router;
