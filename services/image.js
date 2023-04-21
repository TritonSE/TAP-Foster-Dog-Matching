const { firebaseStorage } = require("./firebase");

const bucket = firebaseStorage.bucket();

/**
 * Uploads an image to Firebase Storage
 *
 * @param {string} path - path to upload image to
 * @param {File} file - file object to upload (can get this from multer)
 * @return {string} - public URL of uploaded image
 */
async function uploadImage(path, file) {
  const fileUpload = bucket.file(path);

  await fileUpload.save(file.buffer, {
    metadata: {
      contentType: file.mimetype,
    },
  });

  fileUpload.makePublic();

  return `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
}

module.exports = { uploadImage };
