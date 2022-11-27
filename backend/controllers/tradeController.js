//dependencies
const express = require('express');

const {
  getAllTrades,
  getTradeByID,
  createTrade,
  deleteTrade,
} = require('../queries/trades');

//sub routes
const tradeController = express.Router();

//index route

tradeController.get('/', async (req, res) => {
  try {
    const allTrades = await getAllTrades();
    res.status(200).json({ success: true, payload: allTrades });
  } catch (error) {
    res.status(404).json({ sucess: false, message: 'no trades found!' });
  }
});

tradeController.get('/:trade_id', async (req, res) => {
  const { trade_id } = req.params;

  const getTrade = await getTradeByID(trade_id);
  if (getTrade[0]) {
    res.status(200).json({ success: true, payload: getTrade[0] });
  } else {
    res.status(404).json({
      success: false,
      payload: `no trade found with id of ${trade_id}`,
    });
  }
});

tradeController.post('/newtrade', async (req, res) => {
  const addTrade = await createTrade(req.body);
  console.log(req.body);
  if (addTrade) {
    res.status(200).json({ success: true, payload: addTrade });
  } else {
    res.status(404).send({ success: false, payload: 'create trade error' });
  }
});

tradeController.delete('/:trade_id', async (req, res) => {
  const { trade_id } = req.params;
  const deletedTrade = await deleteTrade(trade_id);

  if (deletedTrade.trade_id) {
    res.status(200).json({ success: true, payload: deletedTrade });
  } else {
    res
      .status(404)
      .json({
        success: false,
        message: `deletion error for trade with id of ${trade_id}`,
      });
  }
});

module.exports = tradeController;
