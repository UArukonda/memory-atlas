const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const {
  createRelation,
  getRelation,
  updateRelation,
  deleteRelation,
} = require("../controllers/relationship.controller.js");

const router = express.Router();
router.use(protect);

router.post("/relationship", createRelation);

router.get("/relationship", getRelation);

router.patch("/relationship", updateRelation);

router.delete("/relationship", deleteRelation);

module.exports = router;
