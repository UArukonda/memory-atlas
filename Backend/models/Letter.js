const mongoose = require("mongoose");

const letterSchema = new mongoose.Schema(
  {
    relationshipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Relationship",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: { type: String },
    from: { type: String },
    title: { type: String },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Letter", letterSchema);
