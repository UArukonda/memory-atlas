const Journal = require("../models/Journal.js");

function createJournalDocument(journalData) {
  return Journal.create(journalData);
}

function getJournalCollection(id) {
  return Journal.find({ relationshipId: id }).populate("createdBy", "username");
}

function getJournalDocumentById(id) {
  return Journal.findById(id).populate("createdBy", "username");
}

function deleteJournalDocument(id) {
  return Journal.deleteOne({ _id: id });
}

module.exports = {
  createJournalDocument,
  getJournalCollection,
  getJournalDocumentById,
  deleteJournalDocument,
};
