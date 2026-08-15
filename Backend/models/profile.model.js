const Profile = require("../schemas/Profile.js");

function getProfileById(id) {
  return Profile.findOne({ userId: id });
}

function createProfileDocument(id, displayName, bio, avatar) {
  return Profile.create({ userId: id, displayName, bio, avatar });
}

function updateProfileDocument(id, updates) {
  return Profile.findOneAndUpdate(
    { userId: id },
    { $set: updates },
    { new: true },
  );
}

module.exports = {
  getProfileById,
  createProfileDocument,
  updateProfileDocument,
};
