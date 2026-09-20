const {
  createPhotoDocument,
  getPhotoCollection,
  deletePhotoDocument,
} = require("../repositories/photo.repository.js");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = require("../utils/r2Client.js");

const createPhoto = async (req, res, next) => {
  try {
    const photos = req.files.map(
      (file) => `${process.env.R2_PUBLIC_URL}/${file.key}`,
    );
    const createdPhotos = await Promise.all(
      photos.map((url) =>
        createPhotoDocument({
          relationshipId: req.relationship._id,
          uploadedBy: req.user.id,
          url,
        }),
      ),
    );
    return res.status(201).send({ photos: createdPhotos });
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
  const { caption } = req.body;
  try {
    const photo = req.resource;

    if (caption !== undefined) photo.caption = caption;

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
