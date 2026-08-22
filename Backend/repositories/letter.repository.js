const Letter = require("../models/Letter.js");

function createLetterDocument(letterData) {
  return Letter.create(letterData);
}

function getLettersCollection(id) {
  return Letter.find({ relationshipId: id });
}

function getLetterDocumentById(id) {
  return Letter.findById(id);
}

function deleteLetterDocument(id) {
  return Letter.deleteOne({ _id: id });
}

module.exports = {
  createLetterDocument,
  getLettersCollection,
  getLetterDocumentById,
  deleteLetterDocument,
};
