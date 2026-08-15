const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const { createProfile } = require("../controllers/profile.controller.js");

const router = express.Router();
router.use(protect);

router.post("/profile", createProfile);

module.exports = router;
