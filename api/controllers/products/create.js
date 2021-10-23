const database = require('../../services/database');
const { uploadImage } = require('../../services/media');

module.exports = async (req, res) => {
  try {
    const relatedUserId = req.tokenData.id;

    const userData = await database.findOne('users', '_id', relatedUserId);

    if (userData === null) return res.status(401).json('User doesn\'t exist.');

    if (!userData.verified) return res.status(401).json('Must verify email to create products.');

    const {
      productName,
      productPrice,
      productDescription,
      productType,
      productLocation,
      productAvailableDates,
    } = req.body;

    let imgPath;
    if (req.file) { imgPath = req.file.path; }
    if (!req.file) { imgPath = './generic.png'; }

    const productImgUrl = await uploadImage(imgPath);

    const document = {
      relatedUserId,
      productImgUrl,
      productName,
      productPrice,
      productDescription,
      productType,
      productLocation,
      productAvailableDates,
    };

    await database.insertOne('products', document);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(400).json(String(err.message));
  }
};
