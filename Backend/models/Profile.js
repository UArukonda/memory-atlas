const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  displayName: String,
  avatar: String,
  bio: String,
});

module.exports = mongoose.model("Profile", ProfileSchema);
