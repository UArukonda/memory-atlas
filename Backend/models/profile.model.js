const Profile = require("../schemas/Profile.js");

function getProfileById(id) {
  return Profile.findOne({ userId: id });
}

function createProfileDocument(id, displayName, bio, avatar) {
  return Profile.create({ userId: id, displayName, bio, avatar });
}

module.exports = { getProfileById, createProfileDocument };
