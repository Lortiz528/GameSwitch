// DEPENDENCIES

const express = require('express');
const cors = require('cors');
const usersController = require('./controllers/usersController');
const userGamesController = require('./controllers/userGamesController');
// const { application } = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to Game Switch NYC');
});

//route of users
app.use('/users', usersController);

//route for userGames
app.use('/loggedin', userGamesController);

app.get('*', (req, res) => {
  res.status(404).send('Not found!');
});

// EXPORT
module.exports = app;
