const {
  createProfileDocument,
  updateProfileDocument,
} = require("../repositories/profile.repository.js");
const { findUserByEmail } = require("../repositories/user.repository.js");

const createProfile = async (req, res, next) => {
  const { displayName, bio, avatar } = req.body;
  const user = req.user;

  try {
    const existingUser = await findUserByEmail(user.email);
    await createProfileDocument(existingUser._id, displayName, bio, avatar);
    return res.status(201).json({ message: "Profile created" });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  const user = req.user;
  const updates = req.body;
  try {
    const existingUser = await findUserByEmail(user.email);
    await updateProfileDocument(existingUser._id, updates);
    return res.status(201).json({ message: "Profile updated" });
  } catch (err) {
    next(err);
  }
};

module.exports = { createProfile, updateProfile };
