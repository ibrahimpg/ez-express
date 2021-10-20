const database = require('../../services/database');

module.exports = async (req, res) => {
  try {
    const requesterId = req.tokenData.id;

    const { productId } = req.body;

    const productData = await database.findOne('products', '_id', productId);

    if (productData.relatedUserId !== requesterId) return res.status(401).send('Unauthorized');

    await database.deleteOne('products', '_id', productId);

    return res.sendStatus(200);
  } catch (err) {
    return res.status(400).json(String(err.message));
  }
};
