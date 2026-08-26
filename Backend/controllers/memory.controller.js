const {
  getRelationship,
} = require("../repositories/relationship.repository.js");
const {
  createMemoryDocument,
  getMemoryCollection,
  getMemoryDocumentById,
  deleteMemoryDocument,
} = require("../repositories/memory.repository.js");

const createMemory = async (req, res, next) => {
  const photos = req.files.map((file) => `/uploads/${file.filename}`);
  try {
    const isCreated = await createMemoryDocument({
      ...req.body,
      photos,
      relationshipId: req.relationship._id,
      createdBy: req.user.id,
    });

    return res.status(201).send({ memory: isCreated });
  } catch (err) {
    next(err);
  }
};

const fetchMemories = async (req, res, next) => {
  try {
    const memories = await getMemoryCollection(req.relationship._id);
    return res.status(200).send({ memories });
  } catch (err) {
    next(err);
  }
};

const fetchMemoryById = async (req, res, next) => {
  try {
    return res.status(200).send({ memory: req.resource });
  } catch (err) {
    next(err);
  }
};

const updateMemory = async (req, res, next) => {
  const { title, place, description, date } = req.body;
  const photos = req.files.map((file) => `/uploads/${file.filename}`);

  try {
    const memory = req.resource;

    if (title !== undefined) memory.title = title;
    if (place !== undefined) memory.place = place;
    if (description !== undefined) memory.description = description;
    if (date !== undefined) memory.date = date;
    if (photos !== undefined) memory.photos.push(...photos);

    await memory.save();
    return res.status(200).json({
      message: "Memory updated successfully",
      memory,
    });
  } catch (err) {
    next(err);
  }
};

const deleteMemory = async (req, res, next) => {
  try {
    const isDeleted = await deleteMemoryDocument(req.resource._id);

    return res.status(200).json({ message: "Memory deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createMemory,
  fetchMemories,
  fetchMemoryById,
  updateMemory,
  deleteMemory,
};
