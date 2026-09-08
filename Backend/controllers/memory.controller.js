const {
  getRelationship,
} = require("../repositories/relationship.repository.js");
const {
  createMemoryDocument,
  getMemoryCollection,
  deleteMemoryDocument,
} = require("../repositories/memory.repository.js");
const {
  createPhotoDocument,
  getPhotosByMemoryId,
} = require("../repositories/photo.repository.js");

const createMemory = async (req, res, next) => {
  const photos = req.files.map(
    (file) => `${process.env.R2_PUBLIC_URL}/${file.key}`,
  );
  try {
    const isCreated = await createMemoryDocument({
      ...req.body,
      relationshipId: req.relationship._id,
      createdBy: req.user.id,
    });

    await Promise.all(
      photos.map((photo) =>
        createPhotoDocument({
          relationshipId: req.relationship._id,
          memoryId: isCreated._id,
          uploadedBy: req.user.id,
          url: photo,
        }),
      ),
    );

    return res.status(201).send({ memory: isCreated });
  } catch (err) {
    next(err);
  }
};

const fetchMemories = async (req, res, next) => {
  try {
    const memories = await getMemoryCollection(req.relationship._id);
    const memoryIds = memories.map((memory) => memory._id);
    const photos = await getPhotosByMemoryId(memoryIds);
    const updatedMemories = memories.map((memory) => {
      const memoryObj = memory.toObject();
      memoryObj.photos = photos.filter((photo) =>
        photo.memoryId.equals(memory._id),
      );
      return memoryObj;
    });
    return res.status(200).send({ memories: updatedMemories });
  } catch (err) {
    next(err);
  }
};

const fetchMemoryById = async (req, res, next) => {
  const memory = req.resource;
  try {
    // const photos = await getPhotosByMemoryId();
    return res.status(200).send({ memory });
  } catch (err) {
    next(err);
  }
};

const updateMemory = async (req, res, next) => {
  const { title, place, description, date } = req.body;
  const photos = req.files.map(
    (file) => `${process.env.R2_PUBLIC_URL}/${file.key}`,
  );

  try {
    const memory = req.resource;
    if (title !== undefined) memory.title = title;
    if (place !== undefined) memory.place = place;
    if (description !== undefined) memory.description = description;
    if (date !== undefined) memory.date = date;
    await Promise.all(
      photos.map((photo) =>
        createPhotoDocument({
          relationshipId: req.relationship._id,
          memoryId: memory._id,
          uploadedBy: req.user.id,
          url: photo,
        }),
      ),
    );

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
