const Photo = require("../models/Photo.js");

function createPhotoDocument(photoData) {
  return Photo.create(photoData);
}

function getPhotoCollection(relationshipId) {
  return Photo.find({ relationshipId });
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
};
