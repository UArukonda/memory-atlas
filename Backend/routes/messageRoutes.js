const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const requireRelationship = require("../middleware/requireRelationship.js");
const {
  fetchMessages,
  fetchUnreadCount,
  readMessages,
} = require("../controllers/message.controller.js");

const router = express.Router();
router.use(protect);
router.use(requireRelationship);

router.get("/message", fetchMessages);

router.get("/message/unread-count", fetchUnreadCount);

router.patch("/message/read", readMessages);

module.exports = router;
