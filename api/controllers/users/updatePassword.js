const { hash, compare } = require('../../utilities/crypto');
const database = require('../../services/database');

module.exports = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const { id } = req.tokenData;

    const userData = await database.findOne('users', '_id', id);

    if (userData === null) return res.status(401).send('Username doesn\'t exist.');

    if (!compare(oldPassword, userData.password, userData.salt, userData.keylen)) return res.sendStatus(401);

    const { hashedPassword, salt, keylen } = hash(newPassword);

    await database.updateOne('users', '_id', id, { password: hashedPassword, salt, keylen });

    return res.sendStatus(200);
  } catch (err) {
    return res.status(400).json(String(err.message));
  }
};
