const User = require("../schemas/UserSchema.js");

function findUserByEmail(email) {
  return User.findOne({ email });
}

function findUserByUsername(username) {
  return User.findOne({ username });
}

function createUser(userData) {
  return User.create(userData);
}

module.exports = { findUserByEmail, findUserByUsername, createUser };
