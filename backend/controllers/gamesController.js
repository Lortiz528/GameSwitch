//dependencies
const express = require('express');

const { getAllGames, getGame } = require('../queries/games');

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

gamesController.get('/:game_id', async (req, res) => {
  const { game_id} = req.params
  const game = await getGame(game_id)
  if (game[0]) {
    res.status(200).json({ success: true, payload: game[0] })
  } else {
    res.status(404).json({ success: false, payload: 'no game found' })
  }
})

module.exports = gamesController;
