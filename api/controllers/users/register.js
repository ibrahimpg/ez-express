const { randomBytes } = require('crypto');
const { validateNewUser } = require('../../utilities/validation');
const { hash } = require('../../utilities/crypto');
const { uploadImage } = require('../../services/media');
const { sendVerificationEmail } = require('../../services/email');
const database = require('../../services/database');

module.exports = async (req, res) => {
  try {
    const { username, password, email, companyName, companyDescription } = req.body;

    if (!validateNewUser(username, password, email, companyName, companyDescription)[0]) {
      const validationErrMsg = validateNewUser(username, password, email, companyName, companyDescription)[1];
      return res.status(400).json(validationErrMsg.toString().replace(/.,/g, ', '));
    }

    const checkExistingUser = await database.findAll('users', 'username', username);

    if (checkExistingUser.length > 0) return res.status(400).json('Username already exists.');

    const checkExistingEmail = await database.findAll('users', 'email', email);

    if (checkExistingEmail.length > 0) return res.status(400).json('Email already in use.');

    const verificationCode = randomBytes(4).toString('hex');

    const { hashedPassword, salt, keylen } = hash(password);

    await sendVerificationEmail(email, username, verificationCode);

    const imgUrl = await uploadImage('./blank.png', `users/${username}`);

    const data = {
      username,
      password: hashedPassword,
      salt,
      keylen,
      email,
      imgUrl,
      verificationCode,
      verified: false,
      companyName,
      companyDescription,
    };

    await database.insertOne('users', data);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(400).json(String(err.message));
  }
};
