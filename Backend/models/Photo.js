const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    relationshipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Relationship",
      required: true,
    },
    memoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Memory",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["photo", "video"],
      default: "photo",
    },
    caption: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Photo", photoSchema);
