const express = require('express');
const path = require('path');
const cors = require('cors');
const api = require('./api');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client/public')));

app.use('/api', api);

module.exports = app;
