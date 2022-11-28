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
    const trade = await db.any('SELECT * FROM tradeRequests where trade_id=$1', trade_id);
    return trade;
  } catch (error) {
    res.status(404).json({ sucess: false, message: `no trade with id of ${trade_id}` });
  }
};


const getReceivedTradesByUserID = async (trade_receiver_user_id) => {
  try {
    const trade = await db.any('SELECT * FROM tradeRequests where trade_receiver_user_id=$1', trade_receiver_user_id);
    return trade;
  } catch (error) {
    res.status(404).json({ sucess: false, message: `no trade with id of ${trade_receiver_user_id}` });
  }
}

const getOfferedTradesByUserID = async (trade_offerer_user_id) => {
  try {
    const trade = await db.any('SELECT * FROM tradeRequests where trade_offerer_user_id=$1', trade_offerer_user_id);
    return trade;
  } catch (error) {
    res.status(404).json({ sucess: false, message: `no trade offered by user id ${trade_offerer_user_id}` });
  }
}

const createTrade = async (trade) => {
  const {
    trade_offerer_game_id,
    trade_receiver_game_id,
    trade_offerer_user_id,
    trade_receiver_user_id,
  } = trade;

  try {
    const addTrade = await db.one(
      'insert into tradeRequests (trade_offerer_game_id,trade_receiver_game_id, trade_offerer_user_id, trade_receiver_user_id) values ($1,$2,$3,$4) returning *',
      [
        trade_offerer_game_id,
        trade_receiver_game_id,
        trade_offerer_user_id,
        trade_receiver_user_id,
      ]
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
  getReceivedTradesByUserID,
  getOfferedTradesByUserID
};
