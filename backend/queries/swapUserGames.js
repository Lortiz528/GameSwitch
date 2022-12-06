//import the db object
const db = require("../db/dbConfig.js");

//swap the games among two users
const swapGames = async (swapGameRequest) => {
  const { offerer_id, receiver_id, offerer_game_id, receiver_game_id } =
    swapGameRequest;

  try {
    const swapGame = await db.one();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  swapGames,
};
