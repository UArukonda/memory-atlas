const Memory = require("../models/Memory.js");

function createMemoryDocument(memoryData) {
  return Memory.create(memoryData);
}

function getMemoryCollection(id) {
  return Memory.find({ relationshipId: id });
}

function getMemoryDocumentById(id) {
  return Memory.findById(id);
}

function deleteMemoryDocument(id) {
  return Memory.deleteOne({ _id: id });
}

module.exports = {
  createMemoryDocument,
  getMemoryCollection,
  getMemoryDocumentById,
  deleteMemoryDocument,
};
