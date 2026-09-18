const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const {
  createRelation,
  getRelation,
  updateRelation,
  deleteRelation,
} = require("../controllers/relationship.controller.js");
const upload = require("../middleware/upload.js");

const router = express.Router();
router.use(protect);

router.post("/relationship", createRelation);

router.get("/relationship", getRelation);

router.patch(
  "/relationship",
  upload.fields([
    { name: "coverPhoto", maxCount: 1 },
    { name: "couplePhoto", maxCount: 1 },
  ]),
  updateRelation,
);

router.delete("/relationship", deleteRelation);

module.exports = router;
