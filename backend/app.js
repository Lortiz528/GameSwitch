// DEPENDENCIES

const express = require('express');
const cors = require('cors');

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
  res.send('welcome to Game Switch NYC');
});

app.get('*', (req, res) => {
  res.status(404).send('Not found!');
});

// EXPORT
module.exports = app;
