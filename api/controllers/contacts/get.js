const database = require('../../services/database');

module.exports = async (req, res) => {
  try {
    const relatedUserId = req.tokenData.id;

    const results = await database.findAll('contacts', 'relatedUserId', relatedUserId);

    return res.status(200).send(results);
  } catch (err) {
    return res.status(400).json(String(err.message));
  }
};
