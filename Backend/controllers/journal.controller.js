const {
  getRelationship,
} = require("../repositories/relationship.repository.js");
const {
  createJournalDocument,
  getJournalCollection,
  deleteJournalDocument,
} = require("../repositories/journal.repository.js");

const createJournal = async (req, res, next) => {
  try {
    const isCreated = await createJournalDocument({
      ...req.body,
      relationshipId: req.relationship._id,
      createdBy: req.user.id,
    });

    return res.status(201).send({ journal: isCreated });
  } catch (err) {
    next(err);
  }
};

const fetchJournals = async (req, res, next) => {
  try {
    const journals = await getJournalCollection(req.relationship._id);
    return res.status(200).send({ journals });
  } catch (err) {
    next(err);
  }
};

const fetchJournalById = async (req, res, next) => {
  try {
    return res.status(200).send({ journal: req.resource });
  } catch (err) {
    next(err);
  }
};

const updateJournal = async (req, res, next) => {
  const { title, description, date } = req.body;
  try {
    const journal = req.resource;
    if (title !== undefined) journal.title = title;
    if (description !== undefined) journal.description = description;
    if (date !== undefined) journal.date = date;

    await journal.save();
    return res.status(200).json({
      message: "Journal updated successfully",
      journal,
    });
  } catch (err) {
    next(err);
  }
};

const deleteJournal = async (req, res, next) => {
  try {
    const isDeleted = await deleteJournalDocument(req.resource._id);
    return res.status(200).send({ message: "Journal deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createJournal,
  fetchJournals,
  fetchJournalById,
  updateJournal,
  deleteJournal,
};
