const db = require('../db/dbConfig.js');

//get all trade requests info from the database
const getAllTrades = async () => {
  try {
    const allTrades = await db.any('SELECT * FROM tradeRequests');
    return allTrades;
  } catch (error) {
    res.status(404).json({ sucess: false, message: 'no trades!' });
  }
};

const getTradeByID = async (trade_id) => {
  try {
    const trade = await db.any(
      'SELECT * FROM   where trade_id=$1',
      trade_id
    );
    return trade;
  } catch (error) {
    res
      .status(404)
      .json({ sucess: false, message: `no trade with id of ${trade_id}` });
  }
};

const createTrade = async (trade) => {
  const { trade_game1, trade_game2 } = trade;

  try {
    const addTrade = await db.one(
      'insert into tradeRequests (trade_game1, trade_game2) values ($1,$2) returning *',
      [trade_game1, trade_game2]
    );
    return addTrade;
  } catch (error) {
    res.status(404).json({
      sucess: false,
      message: 'unable to create Trade Request!:',
      error,
    });
  }
};

const deleteTrade = async (trade_id) => {
  try {
    const deletedtrade = await db.one(
      'DELETE FROM tradeRequests WHERE trade_id=$1 RETURNING *',
      trade_id
    );
    return deletedtrade;
  } catch (error) {
    console.log(error.message || error);
    return error;
  }
};

module.exports = {
  getAllTrades,
  getTradeByID,
  createTrade,
  deleteTrade,
};
