const database = require('../../services/database');

module.exports = async (req, res) => {
  try {
    const { username } = req.params;

    const userData = await database.findOne('users', 'username', username);

    if (userData === null) return res.status(401).send('Username doesn\'t exist.');

    const data = { username: userData.username, imgUrl: userData.imgUrl };

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(400).json(String(err.message));
  }
};
