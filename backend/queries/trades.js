const db = require("../db/dbConfig.js");

//get all trade requests info from the database
const getAllTrades = async () => {
  try {
    const allTrades = await db.any("SELECT * FROM tradeRequests");
    return allTrades;
  } catch (error) {
    console.log(error.message);
  }
};

const getTradeByID = async (trade_id) => {
  try {
    const trade = await db.any(
      "SELECT * FROM tradeRequests where trade_id=$1",
      trade_id
    );
    return trade;
  } catch (error) {
    console.log(error.message);
  }
};

const getReceivedTradesByUserID = async (trade_receiver_user_id) => {
  try {
    const trade = await db.any(
      "SELECT Receivers.user_name AS receiver_name, Offers.user_name AS offer_name, ReceivedGame.game_name AS receiver_game_name, OfferedGame.game_name AS offerer_game_name, tradeRequests.trade_id,tradeRequests.trade_offerer_game_id,tradeRequests.trade_receiver_game_id, tradeRequests.trade_offerer_user_id,tradeRequests.trade_receiver_user_id, tradeRequests.trade_success, tradeRequests.created_at FROM tradeRequests JOIN users AS Receivers ON Receivers.user_id = tradeRequests.trade_receiver_user_id JOIN users AS Offers ON Offers.user_id = tradeRequests.trade_offerer_user_id JOIN games AS ReceivedGame ON ReceivedGame.game_id = tradeRequests.trade_receiver_game_id JOIN games AS OfferedGame ON OfferedGame.game_id = tradeRequests.trade_offerer_game_id WHERE trade_receiver_user_id=$1;",
      trade_receiver_user_id
    );
    return trade;
  } catch (error) {
    console.log(error.message);
  }
};

const getOfferedTradesByUserID = async (trade_offerer_user_id) => {
  try {
    const trade = await db.any(
      "SELECT Receivers.user_name AS receiver_name, Offers.user_name AS offer_name, ReceivedGame.game_name AS receiver_game_name, OfferedGame.game_name AS offerer_game_name, tradeRequests.trade_id,tradeRequests.trade_offerer_game_id,tradeRequests.trade_receiver_game_id, tradeRequests.trade_offerer_user_id,tradeRequests.trade_receiver_user_id, tradeRequests.trade_success, tradeRequests.created_at ,tradeRequests.trade_complete_from_offerer, tradeRequests.trade_complete_from_receiver FROM tradeRequests JOIN users AS Receivers ON Receivers.user_id = tradeRequests.trade_receiver_user_id JOIN users AS Offers ON Offers.user_id = tradeRequests.trade_offerer_user_id JOIN games AS ReceivedGame ON ReceivedGame.game_id = tradeRequests.trade_receiver_game_id JOIN games AS OfferedGame ON OfferedGame.game_id = tradeRequests.trade_offerer_game_id WHERE trade_offerer_user_id=$1",
      trade_offerer_user_id
    );
    return trade;
  } catch (error) {
    console.log(error.message);
  }
};

const createTrade = async (trade) => {
  const {
    trade_offerer_game_id,
    trade_receiver_game_id,
    trade_offerer_user_id,
    trade_receiver_user_id,
  } = trade;

  try {
    const addTrade = await db.one(
      "insert into tradeRequests (trade_offerer_game_id,trade_receiver_game_id, trade_offerer_user_id, trade_receiver_user_id) values ($1,$2,$3,$4) returning *",
      [
        trade_offerer_game_id,
        trade_receiver_game_id,
        trade_offerer_user_id,
        trade_receiver_user_id,
      ]
    );
    return addTrade;
  } catch (error) {
    console.log(error.message);
  }
};

//update trade
const updateTrade = async (trade) => {
  const {
    trade_id,
    trade_success,
    trade_complete_from_offerer,
    trade_complete_from_receiver,
  } = trade;

  try {
    const updateTrade = await db.one(
      "update tradeRequests set trade_success=$1,trade_complete_from_offerer=$2, trade_complete_from_receiver=$3  where trade_id=$4 returning *",
      [
        trade_success,
        trade_complete_from_offerer,
        trade_complete_from_receiver,
        trade_id,
      ]
    );
    return updateTrade;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteTrade = async (trade_id) => {
  try {
    const deletedtrade = await db.one(
      "DELETE FROM tradeRequests WHERE trade_id=$1 RETURNING *",
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
  updateTrade,
  deleteTrade,
  getReceivedTradesByUserID,
  getOfferedTradesByUserID,
};
