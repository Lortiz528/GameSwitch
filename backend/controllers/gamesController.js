//dependencies
const express = require('express');

const { getAllGames } = require('../queries/games');

//sub routes
const gamesController = express.Router();

//index route
//display all games
gamesController.get('/', async (req, res) => {
  try {
    const allGames = await getAllGames();
    res.status(200).json({ success: true, payload: allGames });
  } catch (error) {
    res.status(404).json({ sucess: false, message: 'no games found!' });
  }
});

module.exports = gamesController;
