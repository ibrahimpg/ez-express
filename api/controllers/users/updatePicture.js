const uploadImage = require('../../services/media');
const database = require('../../services/database');

module.exports = async (req, res) => {
  try {
    const imgPath = req.file.path;

    const { id, username } = req.tokenData;

    const imgUrl = await uploadImage(imgPath, `users/${username}`);

    await database.updateOne('users', '_id', id, { imgUrl });

    return res.status(200).send(imgUrl);
  } catch (err) {
    return res.status(400).json(String(err.message));
  }
};
