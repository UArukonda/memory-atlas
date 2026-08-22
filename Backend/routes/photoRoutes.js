const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const requireRelationship = require("../middleware/requireRelationship.js");
const requireOwnership = require("../middleware/requireOwnership.js");
const { getPhotoDocumentById } = require("../repositories/photo.repository.js");
const {
  createPhoto,
  fetchPhotos,
  fetchPhotoById,
  updatePhoto,
  deletePhoto,
} = require("../controllers/photo.controller.js");

const router = express.Router();
router.use(protect);
router.use(requireRelationship);

router.post("/photo", createPhoto);

router.get("/photo", fetchPhotos);

router.get(
  "/photo/:id",
  requireOwnership(getPhotoDocumentById),
  fetchPhotoById,
);

router.patch("/photo/:id", requireOwnership(getPhotoDocumentById), updatePhoto);

router.delete(
  "/photo/:id",
  requireOwnership(getPhotoDocumentById),
  deletePhoto,
);

module.exports = router;
