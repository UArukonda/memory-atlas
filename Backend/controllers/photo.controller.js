const {
  createPhotoDocument,
  getPhotoCollection,
  deletePhotoDocument,
} = require("../repositories/photo.repository.js");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = require("../utils/r2Client.js");

const createPhoto = async (req, res, next) => {
  try {
    const isCreated = await createPhotoDocument({
      ...req.body,
      relationshipId: req.relationship._id,
      uploadedBy: req.user.id,
    });

    return res.status(201).send({ photo: isCreated });
  } catch (err) {
    next(err);
  }
};

const fetchPhotos = async (req, res, next) => {
  try {
    const photos = await getPhotoCollection(req.relationship._id);
    return res.status(200).send({ photos });
  } catch (err) {
    next(err);
  }
};

const fetchPhotoById = async (req, res, next) => {
  try {
    return res.status(200).send({ photo: req.resource });
  } catch (err) {
    next(err);
  }
};

const updatePhoto = async (req, res, next) => {
  const { url, type, caption, memoryId } = req.body;
  try {
    const photo = req.resource;

    if (url !== undefined) photo.url = url;
    if (type !== undefined) photo.type = type;
    if (caption !== undefined) photo.caption = caption;
    if (memoryId !== undefined) photo.memoryId = memoryId;

    await photo.save();
    return res
      .status(200)
      .send({ message: "Photo updated successfully", photo });
  } catch (err) {
    next(err);
  }
};

const deletePhoto = async (req, res, next) => {
  try {
    const key = req.resource.url.split(`${process.env.R2_PUBLIC_URL}/`)[1];
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
      }),
    );
    await deletePhotoDocument(req.resource._id);
    return res.status(200).send({ message: "Photo deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPhoto,
  fetchPhotos,
  fetchPhotoById,
  updatePhoto,
  deletePhoto,
};
