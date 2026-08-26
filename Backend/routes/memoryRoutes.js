const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const requireRelationship = require("../middleware/requireRelationship.js");
const requireOwnership = require("../middleware/requireOwnership.js");
const {
  createMemory,
  fetchMemories,
  fetchMemoryById,
  updateMemory,
  deleteMemory,
} = require("../controllers/memory.controller.js");
const {
  getMemoryDocumentById,
} = require("../repositories/memory.repository.js");
const upload = require("../middleware/upload.js");

const router = express.Router();

router.use(protect);
router.use(requireRelationship);

router.post("/memory", upload.array("photo", 5), createMemory);

router.get("/memory", fetchMemories);

router.get(
  "/memory/:id",
  requireOwnership(getMemoryDocumentById),
  fetchMemoryById,
);

router.patch(
  "/memory/:id",
  requireOwnership(getMemoryDocumentById),
  upload.array("photo", 5),
  updateMemory,
);

router.delete(
  "/memory/:id",
  requireOwnership(getMemoryDocumentById),
  deleteMemory,
);

module.exports = router;
