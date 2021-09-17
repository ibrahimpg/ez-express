const cloudinary = require('cloudinary');

exports.uploadImage = async (filePath, fileName) => {
  const response = await cloudinary.v2.uploader.upload(filePath, { public_id: fileName });
  return response.secure_url;
};
