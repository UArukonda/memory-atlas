const {
  createLetterDocument,
  getLettersCollection,
  deleteLetterDocument,
} = require("../repositories/letter.repository.js");

const createLetter = async (req, res, next) => {
  try {
    const isCreated = await createLetterDocument({
      ...req.body,
      relationshipId: req.relationship._id,
      createdBy: req.user.id,
    });

    return res.status(201).send({ letter: isCreated });
  } catch (err) {
    next(err);
  }
};

const fetchLetters = async (req, res, next) => {
  try {
    const letters = await getLettersCollection(req.relationship._id);
    return res.status(200).send({ letters });
  } catch (err) {
    next(err);
  }
};
const fetchLetterById = async (req, res, next) => {
  try {
    return res.status(200).send({ letter: req.resource });
  } catch (err) {
    next(err);
  }
};

const updateLetter = async (req, res, next) => {
  const { to, from, title, message, date } = req.body;
  try {
    const letter = req.resource;

    if (to !== undefined) letter.to = to;
    if (from !== undefined) letter.from = from;
    if (title !== undefined) letter.title = title;
    if (message !== undefined) letter.message = message;
    if (date !== undefined) letter.date = date;

    await letter.save();
    return res
      .status(200)
      .send({ message: "Letter updated successfully", letter });
  } catch (err) {
    next(err);
  }
};

const deleteLetter = async (req, res, next) => {
  try {
    const isDeleted = await deleteLetterDocument(req.resource._id);
    return res.status(200).send({ message: "Letter deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createLetter,
  fetchLetters,
  fetchLetterById,
  updateLetter,
  deleteLetter,
};
