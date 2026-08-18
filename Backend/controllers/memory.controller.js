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
  try {
    const relationship = await getRelationship(req.user.id);
    if (!relationship) {
      return res.status(404).json({ message: "You are not in a relationship" });
    }
    const isCreated = await createMemoryDocument({
      ...req.body,
      relationshipId: relationship._id,
      createdBy: req.user.id,
    });

    return res.status(201).send({ memory: isCreated });
  } catch (err) {
    next(err);
  }
};

const fetchMemories = async (req, res, next) => {
  try {
    const relationship = await getRelationship(req.user.id);
    if (!relationship) {
      return res.status(404).json({ message: "You are not in a relationship" });
    }
    const memories = await getMemoryCollection(relationship._id);
    return res.status(200).send({ memories });
  } catch (err) {
    next(err);
  }
};

const fetchMemoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const relationship = await getRelationship(req.user.id);
    if (!relationship) {
      return res.status(404).json({ message: "You are not in a relationship" });
    }
    const memory = await getMemoryDocumentById(id);

    if (!memory) {
      return res.status(404).json({ message: "Memory not found" });
    }

    if (!relationship._id.equals(memory.relationshipId)) {
      return res.status(403).json({
        message: "You do not have access to this memory",
      });
    }

    return res.status(200).send({ memory });
  } catch (err) {
    next(err);
  }
};

const updateMemory = async (req, res, next) => {
  const { id } = req.params;
  const { title, place, description, date, photo, video } = req.body;

  try {
    const relationship = await getRelationship(req.user.id);
    if (!relationship) {
      return res.status(404).json({ message: "You are not in a relationship" });
    }
    const memory = await getMemoryDocumentById(id);
    if (!memory) {
      return res.status(404).json({ message: "Memory not found" });
    }

    if (!relationship._id.equals(memory.relationshipId)) {
      return res.status(403).json({
        message: "You do not have access to this memory",
      });
    }

    if (title !== undefined) memory.title = title;
    if (place !== undefined) memory.place = place;
    if (description !== undefined) memory.description = description;
    if (date !== undefined) memory.date = date;
    if (photo !== undefined) memory.photo = photo;
    if (video !== undefined) memory.video = video;

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
  const { id } = req.params;
  try {
    const relationship = await getRelationship(req.user.id);
    if (!relationship) {
      return res.status(404).json({ message: "You are not in a relationship" });
    }
    const memory = await getMemoryDocumentById(id);

    if (!memory) {
      return res.status(404).json({ message: "Memory not found" });
    }

    if (!relationship._id.equals(memory.relationshipId)) {
      return res.status(403).json({
        message: "You do not have access to this memory",
      });
    }

    const isDeleted = await deleteMemoryDocument(memory._id);

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
