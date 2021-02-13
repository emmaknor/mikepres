const express = require('express');
const { v4: uuidv4 } = require('uuid');
const led = require('./led');

const api = express.Router();

const colorData = {
  colors: [
    {
      hex: '#ff0000',
      count: 0,
    },
    {
      hex: '#00ff00',
      count: 0,
    },
    {
      hex: '#0009bd',
      count: 0,
    },
    {
      hex: '#fcba03',
      count: 0,
    },
    {
      hex: '#fc6203',
      count: 0,
    },
    {
      hex: '#0394fc',
      count: 0,
    },
    {
      hex: '#fc03c6',
      count: 0,
    },
    {
      hex: '#7600ba',
      count: 0,
    },
  ],
  total: 0,
  winner: '#ffffff',
};

let clients = [];

function sendUpdateToAll() {
  clients.forEach(c => {
    c.res.write(`data: ${JSON.stringify(colorData)}\n\n`);
  });
}

function update() {
  sendUpdateToAll();

  let hex = '#ffffff';
  let max = 0;

  for (color of colorData.colors) {
    if (color.count > max) {
      max = color.count;
      hex = color.hex;
    }
  }

  led.setColor(hex);
  colorData.winner = hex;
}

api.get('/streaming', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders();

  // res.write(JSON.stringify(colorData));
  res.write(`data: ${JSON.stringify(colorData)}\n\n`);

  const clientId = uuidv4();
  const newClient = {
    id: clientId,
    res,
  };

  clients.push(newClient);

  res.on('close', () => {
      clients = clients.filter(c => c.id !== clientId);
      res.end();
  });
});

api.get('/', (req, res) => {
  res.send('<h1>Welcome to the API</h1>');
});

api.get('/color', (req, res) => {
  res.send(colorData);
});

api.post('/color', (req, res) => {
  const hex = req.body.hex;
  for (color of colorData.colors) {
    if (color.hex === hex) {
      color.count += 1;
      colorData.total += 1;
      update();
    }
  }
  res.send(colorData);
});

module.exports = api;
