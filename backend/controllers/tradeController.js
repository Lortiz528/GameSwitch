//dependencies
const express = require("express");

const {
  getAllTrades,
  getTradeByID,
  createTrade,
  updateTrade,
  deleteTrade,
  getReceivedTradesByUserID,
  getOfferedTradesByUserID,
} = require("../queries/trades");

//sub routes
const tradeController = express.Router();

//index route

tradeController.get("/", async (req, res) => {
  try {
    const allTrades = await getAllTrades();
    res.status(200).json({ success: true, payload: allTrades });
  } catch (error) {
    res.status(404).json({ sucess: false, message: "no trades found!" });
  }
});

tradeController.get("/:trade_id", async (req, res) => {
  const { trade_id } = req.params;

  const getTrade = await getTradeByID(trade_id);
  if (getTrade) {
    res.status(200).json({ success: true, payload: getTrade[0] });
  } else {
    res.status(404).json({
      success: false,
      payload: `no trade found with id of ${trade_id}`,
    });
  }
});

// get trades received by user id
tradeController.get("/:trade_receiver_user_id/received", async (req, res) => {
  const { trade_receiver_user_id } = req.params;

  const getTrade = await getReceivedTradesByUserID(trade_receiver_user_id);
  if (getTrade) {
    res.status(200).json({ success: true, payload: getTrade });
  } else {
    res.status(200).json({
      success: false,
      payload: `no received trade offers found for user id ${trade_receiver_user_id}`,
    });
  }
});

// get trades offered by user id
tradeController.get("/:trade_offerer_user_id/offered", async (req, res) => {
  const { trade_offerer_user_id } = req.params;

  const getTrade = await getOfferedTradesByUserID(trade_offerer_user_id);
  if (getTrade) {
    res.status(200).json({ success: true, payload: getTrade });
  } else {
    res.status(200).json({
      success: false,
      payload: `no trades offered by user id ${trade_offerer_user_id}`,
    });
  }
});

tradeController.post("/newtrade", async (req, res) => {
  const addTrade = await createTrade(req.body);
  if (addTrade) {
    res.status(200).json({ success: true, payload: addTrade });
  } else {
    res.status(404).send({ success: false, payload: "create trade error" });
  }
});

//update trade controller
tradeController.put("/updatetrade", async (req, res) => {
  console.log(req.body);
  const updateTheTrade = await updateTrade(req.body);
  if (updateTheTrade) {
    res.status(200).json({ success: true, payload: updateTheTrade });
  } else {
    res.status(404).send({ success: false, payload: "update trade error" });
  }
});

tradeController.delete("/:trade_id", async (req, res) => {
  const { trade_id } = req.params;
  const deletedTrade = await deleteTrade(trade_id);

  if (deletedTrade.trade_id) {
    res.status(200).json({ success: true, payload: deletedTrade });
  } else {
    res.status(404).json({
      success: false,
      message: `deletion error for trade with id of ${trade_id}`,
    });
  }
});

module.exports = tradeController;
