const db = require('../db/dbConfig.js');

const getAllUserGames = async (user_id) => {
  try {
    const games = await db.any(
      'SELECT * FROM games WHERE user_id = $1',
      user_id
    );
    return games;
  } catch (err) {
    return err;
  }
};

const getUserGameByID = async (user_id, game_id) => {
  try {
    const game = await db.any(
      'SELECT * FROM games WHERE user_id = $1 AND game_id = $2',
      [user_id, game_id]
    );
    return game;
  } catch (err) {
    return err;
  }
};

const createUserGame = async (
  game_name,
  game_img,
  game_rating,
  game_description,
  game_brand,
  user_id
) => {
  try {
    const newGame = await db.one(
      'INSERT INTO games (game_name, game_img, game_rating, game_description, game_brand, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [game_name, game_img, game_rating, game_description, game_brand, user_id]
    );
    return newGame;
  } catch (error) {
    return error;
  }
};

const updateUserGame = async (
  game_id,
  game_name,
  game_img,
  game_rating,
  game_description,
  game_brand,
  user_id
) => {
  try {
    const updateGame = await db.one(
      'UPDATE games SET game_name=$2, game_img=$3, game_rating=$4, game_description=$5, game_brand=$6, WHERE user_id=$1 AND game_id=$7 RETURNING *',
      [
        user_id,
        game_name,
        game_img,
        game_rating,
        game_description,
        game_brand,
        game_id,
      ]
    );
    return updateGame;
  } catch (error) {
    return error;
  }
};

const deleteUserGame = async (user_id, game_id) => {
  try {
    if (
      game_id === null ||
      game_id === undefined ||
      user_id === null ||
      user_id === undefined
    ) {
      return false; // cant delete what isnt there
    }
    const deletedGame = await db.one(
      'DELETE FROM games WHERE user_id = $1 AND game_id = $2 RETURNING *',
      [user_id, game_id]
    );
    return deletedGame;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllUserGames,
  getUserGameByID,
  createUserGame,
  updateUserGame,
  deleteUserGame,
};
