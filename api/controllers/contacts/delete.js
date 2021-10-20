const database = require('../../services/database');

module.exports = async (req, res) => {
  try {
    const requesterId = req.tokenData.id;

    // const { userRoleLevel } = req.tokenData;

    const { contactId } = req.body;

    const contactData = await database.findOne('contacts', '_id', contactId);

    // if (contactData.relatedUserId !== requesterId || userRoleLevel < 1) return res.status(401).send('Unauthorized');

    if (contactData.relatedUserId !== requesterId) return res.status(401).send('Unauthorized');

    await database.deleteOne('contacts', '_id', contactId);

    return res.sendStatus(200);
  } catch (err) {
    return res.status(400).json(String(err.message));
  }
};
