//dependencies
const express = require('express');
const {
  getAllUserGames,
  getUserGameByID,
  createUserGame,
  updateUserGame,
  deleteUserGame,
} = require('../queries/userGames');

//sub routes
const userGamesController = express.Router();

//index route
//display all userGames
userGamesController.get('/:user_id/games', async (req, res) => {
  const { user_id } = req.params;
  try {
    const allUserGames = await getAllUserGames(user_id);
    res.status(200).json({ success: true, payload: allUserGames });
  } catch (error) {
    res.status(404).json({ sucess: false, message: 'no user games found' });
  }
});

userGamesController.get('/:user_id/games/:game_id', async (req, res) => {
  const { user_id, game_id } = req.params;
  try {
    const oneUserGame = await getUserGameByID(user_id, game_id);

    res.status(200).json({ success: true, payload: oneUserGame });
  } catch (error) {
    res.status(404).json({
      sucess: false,
      message: `no user game found with id of ${game_id}`,
    });
  }
});

userGamesController.post('/:user_id/games', async (req, res) => {
  const { user_id } = req.params;
  const newUserGame = {
    game_name: req.body.game_name,
    game_img: req.body.game_img,
    game_rating: req.body.game_rating,
    game_description: req.body.game_description,
    game_brand: req.body.game_brand,
    game_console: req.body.game_console,
    user_id: user_id,
  };
  try {
    const userGame = await createUserGame(
      newUserGame.game_name,
      newUserGame.game_img,
      newUserGame.game_rating,
      newUserGame.game_description,
      newUserGame.game_brand,
      newUserGame.game_console,
      newUserGame.user_id
    );
    res.status(200).json({ success: true, payload: userGame });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: 'Unable to create new user Game' });
  }
});

userGamesController.put('/:user_id/games/:game_id', async (req, res) => {
  const { user_id, game_id } = req.params;
  const updatedUserGame = {
    game_name: req.body.game_name,
    game_img: req.body.game_img,
    game_rating: req.body.game_rating,
    game_description: req.body.game_description,
    game_brand: req.body.game_brand,
    game_console: req.body.game_console,
  };

  try {
    const userGame = await updateUserGame(
      game_id,
      updatedUserGame.game_name,
      updatedUserGame.game_img,
      updatedUserGame.game_rating,
      updatedUserGame.game_description,
      updatedUserGame.game_brand,
      updatedUserGame.game_console,
      user_id
    );
    res.status(200).json({ success: true, payload: userGame });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: 'unable to update user Game' });
  }
});

userGamesController.delete('/:user_id/games/:game_id', async (req, res) => {
  const { user_id, game_id } = req.params;

  const deletedGame = await deleteUserGame(user_id, game_id);
  if (deletedGame) {
    res.status(200).json({ success: true, payload: deletedGame });
  } else {
    res
      .status(404)
      .json({ sucess: false, message: 'unable to delete user game' });
  }
});

module.exports = userGamesController;
