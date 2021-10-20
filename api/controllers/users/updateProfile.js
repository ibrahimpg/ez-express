const database = require('../../services/database');

module.exports = async (req, res) => {
  try {
    const { id } = req.tokenData;

    const { companyName, companyDescription } = req.body;

    await database.updateOne('users', '_id', id, { companyName, companyDescription });

    // const objKeys = Object.keys(req.body);
    // const objValues = Object.values(req.body);

    // for (let i = 0; i < objKeys.length; i += 1) {
    //   if (typeof objKeys[i] !== 'string') return res.sendStatus(401);
    // }

    // for (let i = 0; i < objValues.length; i += 1) {
    //   if (typeof objValues[i] !== 'string') return res.sendStatus(401);
    // }

    // objValues.map((x) => {
    //   if (typeof x !== 'string') return res.sendStatus(401);
    //   return 'kaka';
    // });

    // const blacklistArray = ['_id', 'username', 'verified', 'verificationId', 'email', 'imgUrl'];

    // blacklistArray.forEach((blacklistedKey) => {
    //   if (updateKeys.includes(blacklistedKey)) return res.sendStatus(401);
    // });

    // find out what happens when we try to update a key taht doesn't exist on the resource

    return res.sendStatus(200);
  } catch (err) {
    return res.status(400).json(String(err.message));
  }
};
