const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const requireRelationship = require("../middleware/requireRelationship.js");
const requireOwnership = require("../middleware/requireOwnership.js");
const {
  getLetterDocumentById,
} = require("../repositories/letter.repository.js");
const {
  createLetter,
  fetchLetters,
  fetchLetterById,
  updateLetter,
  deleteLetter,
} = require("../controllers/letter.controller.js");

const router = express.Router();
router.use(protect);
router.use(requireRelationship);

router.post("/letter", createLetter);

router.get("/letter", fetchLetters);

router.get(
  "/letter/:id",
  requireOwnership(getLetterDocumentById),
  fetchLetterById,
);

router.patch(
  "/letter/:id",
  requireOwnership(getLetterDocumentById),
  updateLetter,
);

router.delete(
  "/letter/:id",
  requireOwnership(getLetterDocumentById),
  deleteLetter,
);

module.exports = router;
