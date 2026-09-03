const Relationship = require("../models/Relationship.js");

function getRelationship(id) {
  return Relationship.findOne({
    $or: [{ userAId: id }, { userBId: id }],
    status: "active",
  });
}

function createRelationshipDocument(userId, partnerId) {
  return Relationship.create({ userAId: userId, userBId: partnerId });
}

function updateRelationshipDocument(relationData, id) {
  return Relationship.findOneAndUpdate({ _id: id }, relationData, {
    returnDocument: "after",
  });
}
module.exports = {
  getRelationship,
  createRelationshipDocument,
  updateRelationshipDocument,
};
