const { randomBytes } = require('crypto');
const { hash } = require('../../utilities/crypto');
const database = require('../../services/database');
const { sendRecoveryEmail } = require('../../services/email');

module.exports = async (req, res) => {
  try {
    const { recoveryType, recoveryValue } = req.body;

    const userData = await database.findOne('users', recoveryType, recoveryValue);

    if (userData === null) return res.status(401).send('Account doesn\'t exist.');

    const { email } = userData;

    const temporaryPassword = randomBytes(4).toString('hex');

    await sendRecoveryEmail(email, temporaryPassword);

    const { hashedPassword, salt, keylen } = hash(temporaryPassword);

    await database.updateOne('users', recoveryType, recoveryValue, { password: hashedPassword, salt, keylen });

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.status(400).json(String(err.message));
  }
};
