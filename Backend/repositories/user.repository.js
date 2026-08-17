const User = require("../models/User.js");

const findUserById = (id) => {
  return User.findById(id);
};

function findUserByEmail(email) {
  return User.findOne({ email });
  // return Promise.reject(new Error("Database connection failed"));
}

function findUserByUsername(username) {
  return User.findOne({ username });
}

function findUserByRelationshipCode(relationshipCode) {
  return User.findOne({ relationshipCode });
}

function createUser(userData) {
  return User.create(userData);
}

function comparePassword(user, pwd) {
  return user.comparePassword(pwd);
}

function updateUserData(user, key, value) {
  user[key] = value;
  return user.save();
}

function deleteUserByEmail(email) {
  return User.deleteOne({ email });
}

module.exports = {
  findUserById,
  findUserByEmail,
  findUserByUsername,
  createUser,
  comparePassword,
  updateUserData,
  deleteUserByEmail,
  findUserByRelationshipCode,
};
