const express = require('express');
const {
  getAllWishlistGames,
  getWishlistGameByID,
  createWishlistGame,
  updateWishlistGame,
  deleteWishlistGame,
} = require('../queries/wishlist');

const wishlistController = express.Router();

wishlistController.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const getUserWishlist = await getAllWishlistGames(user_id);
    res.status(200).json({ success: true, payload: getUserWishlist });
  } catch (error) {
    res.status(404).json({ success: false, message: 'no wishlist found!' });
  }
});

wishlistController.get('/:user_id/:wishlist_game_id', async (req, res) => {
  const { user_id, wishlist_game_id } = req.params;
  const oneWishlistGame = await getWishlistGameByID(user_id, wishlist_game_id);
  if (oneWishlistGame[0]) {
    res.status(200).json({ success: true, payload: oneWishlistGame });
  } else {
    res.status(404).json({
      success: false,
      message: `no game found with id of ${wishlist_game_id}`,
    });
  }
});

wishlistController.post('/:user_id/new', async (req, res) => {
  const { user_id } = req.params;
  const newWishGame = {
    wishlist_game_name: req.body.wishlist_game_name,
    wishlist_game_brand: req.body.wishlist_game_brand,
    wishlist_game_console: req.body.wishlist_game_console,
    user_id: user_id,
  };
  try {
    const userGame = await createWishlistGame(
      newWishGame.wishlist_game_name,
      newWishGame.wishlist_game_brand,
      newWishGame.wishlist_game_console,
      newWishGame.user_id
    );
    res.status(200).json({ success: true, payload: userGame });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: 'unable to create new wishlist game' });
  }
});

wishlistController.put('/:user_id/:wishlist_game_id', async (req, res) => {
  const { user_id, wishlist_game_id } = req.params;
  const updatedWishGame = {
    wishlist_game_name: req.body.wishlist_game_name,
    wishlist_game_brand: req.body.wishlist_game_brand,
    wishlist_game_console: req.body.wishlist_game_console,
  };

  try {
    const userGame = await updateWishlistGame(
      wishlist_game_id,
      updatedWishGame.wishlist_game_name,
      updatedWishGame.wishlist_game_brand,
      updatedWishGame.wishlist_game_console,
      user_id
    );
    res.status(200).json({ success: true, payload: userGame });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: 'unable to update wishlist Game' });
  }
});

wishlistController.delete('/:user_id/:wishlist_game_id', async (req, res) => {
  const { user_id, wishlist_game_id } = req.params;
  const deletedGame = await deleteWishlistGame(user_id, wishlist_game_id);
  if (deletedGame) {
    res.status(200).json({ success: true, payload: deletedGame });
  } else {
    res
      .status(404)
      .json({ sucess: false, message: 'unable to delete wishlist game' });
  }
});

module.exports = wishlistController;
