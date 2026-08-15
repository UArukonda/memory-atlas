const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const { getUser, deleteUser } = require("../controllers/user.controller.js");

const router = express.Router();
router.use(protect);

router.get("/me", getUser);

router.delete("/me", deleteUser);

module.exports = router;
