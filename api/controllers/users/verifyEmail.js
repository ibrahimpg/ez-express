const database = require('../../services/database');

module.exports = async (req, res) => {
  try {
    const { username, verificationCode } = req.params;

    const userData = await database.findOne('users', 'username', username);

    if (userData === null) return res.status(401).send('User doesn\'t exist.');

    if (userData.verified) return res.status(400).send('Email is already verified.');

    if (verificationCode !== userData.verificationCode) return res.status(400).send('Incorrect verification code.');

    await database.updateOne('users', 'username', username, { verified: true });

    return res.status(200).send('Email has been verified. You can close the window.');
  } catch (err) {
    console.log(err);
    return res.status(400).json(String(err.message));
  }
};
