const database = require('../../services/database');

module.exports = async (req, res) => {
  try {
    const { id } = req.tokenData;

    // await database.updateOne('contacts', 'related_user_id', id);
    // the above can be duplicated for as many collections as the app has

    await database.deleteOne('users', '_id', id);

    return res.sendStatus(200);
  } catch (err) {
    return res.status(400).json(String(err.message));
  }
};
