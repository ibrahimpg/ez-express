const database = require('../../services/database');

module.exports = async (req, res) => {
  try {
    const relatedUserId = req.tokenData.id;

    const { firstName, lastName, phoneNumber, emailAddress, jobTitle } = req.body;

    const document = { relatedUserId, firstName, lastName, phoneNumber, emailAddress, jobTitle };

    await database.insertOne('contacts', document);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(400).json(String(err.message));
  }
};
