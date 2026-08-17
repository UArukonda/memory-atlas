const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    relationshipCode: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.pre("save", async function () {
  if (this.relationshipCode) return;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let code, existingUser;

  do {
    code = "";

    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    existingUser = await this.constructor.findOne({ relationshipCode: code });
  } while (existingUser);

  this.relationshipCode = code;
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
