const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const {
  createProfile,
  updateProfile,
} = require("../controllers/profile.controller.js");
const upload = require("../middleware/upload.js");

const router = express.Router();
router.use(protect);

router.post("/profile", upload.single("avatar"), createProfile);

router.patch("/profile", upload.single("avatar"), updateProfile);

module.exports = router;
