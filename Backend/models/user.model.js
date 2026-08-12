const User = require("../schemas/User.js");

function findUserByEmail(email) {
  return User.findOne({ email });
  // return Promise.reject(new Error("Database connection failed"));
}

function findUserByUsername(username) {
  return User.findOne({ username });
}

function createUser(userData) {
  return User.create(userData);
}

function comparePassword(user, pwd) {
  return user.comparePassword(pwd);
}

module.exports = {
  findUserByEmail,
  findUserByUsername,
  createUser,
  comparePassword,
};
