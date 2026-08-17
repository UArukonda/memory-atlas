const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const { createRelation } = require("../controllers/relationship.controller.js");

const router = express.Router();
router.use(protect);

router.post("/relationship", createRelation);

module.exports = router;
