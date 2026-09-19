const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    relationshipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Relationship",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      trim: true,
      maxlength: 2000,
      required: true,
    },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);

messageSchema.index({ relationshipId: 1, createdAt: 1 });

module.exports = mongoose.model("Message", messageSchema);
