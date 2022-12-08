import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL; //localhost:3333

export default function GetTradeScore({ user_id }) {
  const [tradeScore, setTradeScore] = useState(0);

  useEffect(() => {
    axios
      .get(`${API}/trades`)
      .then((res) => {
        const trades = res.data.payload;

        const filteredTrades = trades.filter((trade) => {
          return (
            (trade.trade_offerer_user_id === user_id ||
              trade.trade_receiver_user_id === user_id) &&
            trade.trade_success === "Completed"
          );
        });

        setTradeScore(filteredTrades.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id]);

  return <div>{tradeScore}</div>;
}
