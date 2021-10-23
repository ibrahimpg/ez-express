const { randomBytes } = require('crypto');
const { hash } = require('../../utilities/crypto');
const database = require('../../services/database');
const { sendRecoveryEmail } = require('../../services/email');

module.exports = async (req, res) => {
  try {
    const { email } = req.body;

    const userData = await database.findOne('users', 'email', email);

    if (userData === null) return res.status(400).send('Account doesn\'t exist.');

    const { username } = userData;

    const temporaryPassword = randomBytes(4).toString('hex');

    await sendRecoveryEmail(email, username, temporaryPassword);

    const { hashedPassword, salt, keylen } = hash(temporaryPassword);

    await database.updateOne('users', 'email', email, { password: hashedPassword, salt, keylen });

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.status(400).json(String(err.message));
  }
};
