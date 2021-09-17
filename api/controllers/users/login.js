const jwt = require('jsonwebtoken');
const database = require('../../services/database');
const { compare } = require('../../utilities/crypto');

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userData = await database.findOne('users', 'username', username);

    if (userData === null) return res.status(401).send('Username doesn\'t exist.');

    if (!compare(password, userData.password, userData.salt, userData.keylen)) return res.sendStatus(401);

    const token = jwt.sign({ username, id: userData._id.toString() }, process.env.JWT_KEY, { expiresIn: '4h' });

    const data = { username, token };

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(400).json(String(err.message));
  }
};
