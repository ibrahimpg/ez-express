const { ObjectId } = require('mongodb');
const db = require('../../index');

exports.findOne = async (collection, property, value) => {
  let newQueryValue = value;
  if (property === '_id') newQueryValue = ObjectId(value);
  const response = await db.db().collection(collection).findOne({ [property]: newQueryValue });
  return response;
};

exports.findAll = async (collection, property, value) => {
  const response = await db.db().collection(collection).find(({ [property]: value })).toArray();
  return response;
};

exports.insertOne = async (collection, document) => {
  await db.db().collection(collection).insertOne(document);
};

exports.updateOne = async (collection, queryProperty, queryValue, updateObject) => {
  let newQueryValue = queryValue;
  if (queryProperty === '_id' || queryProperty === 'related_user_id') newQueryValue = ObjectId(queryValue);
  await db.db().collection(collection).updateOne({ [queryProperty]: newQueryValue }, { $set: updateObject });
};

exports.deleteOne = async (collection, queryProperty, queryValue) => {
  let newQueryValue = queryValue;
  if (queryProperty === '_id' || queryProperty === 'related_user_id') newQueryValue = ObjectId(queryValue);
  await db.db().collection(collection).deleteOne({ [queryProperty]: newQueryValue });
};

exports.deleteMany = async (collection, queryProperty, queryValue) => {
  let newQueryValue = queryValue;
  if (queryProperty === '_id' || queryProperty === 'related_user_id') newQueryValue = ObjectId(queryValue);
  await db.db().collection(collection).deleteMany({ [queryProperty]: newQueryValue });
};
