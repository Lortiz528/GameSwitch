//import the db object
const db = require('../db/dbConfig.js');

//get all users info from the database
const getAllGames = async () => {
  try {
    const allGames = await db.any('SELECT * FROM games');
    return allGames;
  } catch (error) {
    res.status(404).json({ sucess: false, message: 'no games!' });
  }
};

module.exports = {
  getAllGames,
};
