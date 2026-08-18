const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const {
  createMemory,
  fetchMemories,
  fetchMemoryById,
  updateMemory,
  deleteMemory,
} = require("../controllers/memory.controller.js");

const router = express.Router();

router.use(protect);

router.post("/memory", createMemory);

router.get("/memory", fetchMemories);

router.get("/memory/:id", fetchMemoryById);

router.patch("/memory/:id", updateMemory);

router.delete("/memory/:id", deleteMemory);

module.exports = router;
