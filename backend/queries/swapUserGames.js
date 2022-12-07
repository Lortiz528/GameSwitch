//import the db object
const db = require("../db/dbConfig.js");

//swap the games among two users
const swapGames = async (swapGameRequest) => {
  const { offerer_id, receiver_id, offerer_game_id, receiver_game_id } =
    swapGameRequest;

  try {
    const swapGameOne = await db.one(
      "update games set user_id=$1 where game_id=$2 returning *;",
      [offerer_id, receiver_game_id]
    );
    const swapGameTwo = await db.one(
      "update games set user_id=$1 where game_id=$2 returning *;",
      [receiver_id, offerer_game_id]
    );
    return [swapGameOne, swapGameTwo];
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  swapGames,
};
