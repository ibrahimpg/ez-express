// require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

const api = require('./api/routes');

let db;

MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((cluster) => {
    db = cluster.db('myDatabase');
    app.listen(process.env.PORT, () => { console.log(`listening at port ${process.env.PORT}...`); });
  })
  .catch((err) => console.log(err));

exports.db = () => db;

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, DELETE');
  next();
});

app.use('/api', api);
