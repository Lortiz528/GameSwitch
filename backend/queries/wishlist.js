const db = require('../db/dbConfig.js');

const getAllWishlistGames = async (user_id) => {
  try {
    const games = await db.any(
      'SELECT * FROM wishlist WHERE user_id = $1',
      user_id
    );
    return games;
  } catch (err) {
    return err;
  }
};

const getWishlistGameByID = async (user_id, wishlist_game_id) => {
  try {
    const game = await db.any(
      'SELECT * FROM wishlist WHERE user_id = $1 AND wishlist_game_id = $2',
      [user_id, wishlist_game_id]
    );
    return game;
  } catch (err) {
    return err;
  }
};

const createWishlistGame = async (
  wishlist_game_name,
  wishlist_game_brand,
  wishlist_game_console,
  user_id
) => {
  try {
    const newGame = await db.one(
      'INSERT INTO wishlist (wishlist_game_name, wishlist_game_brand, wishlist_game_console, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [wishlist_game_name, wishlist_game_brand, wishlist_game_console, user_id]
    );
    return newGame;
  } catch (error) {
    return error;
  }
};

const updateWishlistGame = async (
  wishlist_game_id,
  wishlist_game_name,
  wishlist_game_brand,
  wishlist_game_console,
  user_id
) => {
  try {
    const updateGame = await db.one(
      'UPDATE wishlist SET wishlist_game_name=$2, wishlist_game_brand=$3, wishlist_game_console=$4 WHERE user_id=$1 AND wishlist_game_id=$5 RETURNING *',
      [
        user_id,
        wishlist_game_name,
        wishlist_game_brand,
        wishlist_game_console,
        wishlist_game_id,
      ]
    );
    return updateGame;
  } catch (error) {
    return error;
  }
};

const deleteWishlistGame = async (user_id, wishlist_game_id) => {
  try {
    if (
      wishlist_game_id === null ||
      wishlist_game_id === undefined ||
      user_id === null ||
      user_id === undefined
    ) {
      return false; // cant delete what isnt there
    }
    const deletedGame = await db.one(
      'DELETE FROM wishlist WHERE user_id = $1 AND wishlist_game_id = $2 RETURNING *',
      [user_id, wishlist_game_id]
    );
    return deletedGame;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllWishlistGames,
  getWishlistGameByID,
  createWishlistGame,
  updateWishlistGame,
  deleteWishlistGame,
};
