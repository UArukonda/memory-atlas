const multer = require("multer");
const path = require("path");
const multerS3 = require("multer-s3");
const s3Client = require("../utils/r2Client");

const storage = multerS3({
  s3: s3Client,
  bucket: process.env.R2_BUCKET_NAME,
  key: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
