const Relationship = require("../models/Relationship.js");

function getRelationship(id) {
  return Relationship.findOne({ $or: [{ userAId: id }, { userBId: id }] });
}

function createRelationshipDocument(userId, partnerId) {
  return Relationship.create({ userAId: userId, userBId: partnerId });
}

module.exports = { getRelationship, createRelationshipDocument };
