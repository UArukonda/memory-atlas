const mongoose = require("mongoose");

const RelationshipSchema = new mongoose.Schema(
  {
    userAId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userBId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    relationshipStartDate: {
      type: Date,
    },
    coupleNickname: {
      type: String,
    },
    relationshipDescription: {
      type: String,
    },
    coverPhoto: {
      type: String,
    },
    status: { type: String, enum: ["active", "ended"], default: "active" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Relationship", RelationshipSchema);
