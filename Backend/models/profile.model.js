const Profile = require("../schemas/Profile.js");

function getProfileById(id) {
  return Profile.findOne({ userId: id });
}

module.exports = { getProfileById };
