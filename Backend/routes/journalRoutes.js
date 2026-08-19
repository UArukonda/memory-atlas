const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const requireRelationship = require("../middleware/requireRelationship.js");
const requireOwnership = require("../middleware/requireOwnership.js");
const {
  getJournalDocumentById,
} = require("../repositories/journal.repository.js");
const {
  createJournal,
  fetchJournals,
  fetchJournalById,
  updateJournal,
  deleteJournal,
} = require("../controllers/journal.controller.js");

const router = express.Router();
router.use(protect);
router.use(requireRelationship);

router.post("/journal", createJournal);

router.get("/journal", fetchJournals);

router.get(
  "/journal/:id",
  requireOwnership(getJournalDocumentById),
  fetchJournalById,
);
router.patch(
  "/journal/:id",
  requireOwnership(getJournalDocumentById),
  updateJournal,
);
router.delete(
  "/journal/:id",
  requireOwnership(getJournalDocumentById),
  deleteJournal,
);

module.exports = router;
