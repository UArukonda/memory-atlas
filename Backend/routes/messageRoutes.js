const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const requireRelationship = require("../middleware/requireRelationship.js");
const { fetchMessages } = require("../controllers/message.controller.js");

const router = express.Router();
router.use(protect);
router.use(requireRelationship);

router.get("/message", fetchMessages);

module.exports = router;
