require('dotenv').config();
const express = require('express');

const app = express();

const api = require('./api/routes');

app.use(express.json());

app.use('/api', api);

app.listen(process.env.port);
