const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const {
  createProfile,
  updateProfile,
} = require("../controllers/profile.controller.js");

const router = express.Router();
router.use(protect);

router.post("/profile", createProfile);
router.patch("/profile", updateProfile);

module.exports = router;
