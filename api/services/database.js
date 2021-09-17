const { MongoClient, ObjectId } = require('mongodb');

exports.findOne = async (collection, property, value) => {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const response = await client.db().collection(collection).findOne({ [property]: value });
  client.close();
  return response;
};

exports.findAll = async (collection, property, value) => {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const response = await client.db().collection(collection).find(({ [property]: value })).toArray();
  client.close();
  return response;
};

exports.insertOne = async (collection, document) => {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  await client.db().collection(collection).insertOne(document);
  client.close();
};

exports.updateOne = async (collection, queryProperty, queryValue, updateObject) => {
  let newQueryValue = queryValue;
  if (queryProperty === '_id' || queryProperty === 'related_user_id') newQueryValue = ObjectId(queryValue);
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  await client.db().collection(collection).updateOne({ [queryProperty]: newQueryValue }, { $set: updateObject });
  client.close();
};

exports.deleteOne = async (collection, queryProperty, queryValue) => {
  let newQueryValue = queryValue;
  if (queryProperty === '_id' || queryProperty === 'related_user_id') newQueryValue = ObjectId(queryValue);
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const result = await client.db().collection(collection).deleteOne({ [queryProperty]: newQueryValue });
  console.log(result);
  client.close();
};

exports.deleteMany = async (collection, queryProperty, queryValue) => {
  let newQueryValue = queryValue;
  if (queryProperty === '_id' || queryProperty === 'related_user_id') newQueryValue = ObjectId(queryValue);
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const result = await client.db().collection(collection).deleteMany({ [queryProperty]: newQueryValue });
  console.log(result);
  client.close();
};
