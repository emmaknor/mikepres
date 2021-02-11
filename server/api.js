const express = require('express');

const api = express.Router();

api.get('/', (req, res) => {
  res.send('<h1>Welcome to the API</h1>');
});

module.exports = api;
