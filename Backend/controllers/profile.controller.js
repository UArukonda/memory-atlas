const { createProfileDocument } = require("../models/profile.model.js");
const { findUserByEmail } = require("../models/user.model.js");

const createProfile = async (req, res, next) => {
  const { displayName, bio, avatar } = req.body;
  const user = req.user;

  try {
    const existingUser = await findUserByEmail(user.email);
    await createProfileDocument(existingUser._id, displayName, bio, avatar);
    return res.status(201).json({ message: "Profile updated" });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = { createProfile };
