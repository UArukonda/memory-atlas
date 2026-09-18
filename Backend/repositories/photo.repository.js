const Photo = require("../models/Photo.js");

function createPhotoDocument(photoData) {
  return Photo.create(photoData);
}

function getPhotoCollection(relationshipId) {
  return Photo.find({ relationshipId }).sort({ createdAt: 1 });
}

function getPhotosByMemoryId(memoryId) {
  return Photo.find({ memoryId }).sort({ createdAt: 1 });
}

function getPhotosByMemoryIds(memoryIds) {
  return Photo.find({ memoryId: { $in: memoryIds } }).sort({ createdAt: 1 });
}

function getPhotoDocumentById(id) {
  return Photo.findById(id);
}

function deletePhotoDocument(id) {
  return Photo.deleteOne({ _id: id });
}

module.exports = {
  createPhotoDocument,
  getPhotoCollection,
  getPhotoDocumentById,
  deletePhotoDocument,
  getPhotosByMemoryId,
  getPhotosByMemoryIds,
};
