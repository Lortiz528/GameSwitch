import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { setLogLevel } from "firebase/app";

const API = process.env.REACT_APP_API_URL; //localhost:3333

export default function OfferedRecord({
  offeredRequest,
  offers,
  setOffers,
  index,
}) {
  const [offerInfo, setOfferInfo] = useState(offeredRequest);

  const cancel = () => {
    const gameOffers = [...offers];
    gameOffers.splice(index, 1);
    axios
      .delete(`${API}/trades/${offeredRequest.trade_id}`)
      .then((res) => {
        setOffers(gameOffers);
      })
      .catch((error) => console.log(error));
  };

  const completeTrade = () => {
    offeredRequest.trade_complete_from_offerer = true;
    console.log("offeredRequest", offeredRequest);

    if (offeredRequest.trade_complete_from_receiver === true) {
      offeredRequest.trade_success = "Completed";
      //swap the games here
      const gamesInfo = {};
      gamesInfo.offerer_id = offeredRequest.trade_offerer_user_id;
      gamesInfo.receiver_id = offeredRequest.trade_receiver_user_id;
      gamesInfo.offerer_game_id = offeredRequest.trade_offerer_game_id;
      gamesInfo.receiver_game_id = offeredRequest.trade_receiver_game_id;
      axios
        .put(`${API}/trades/swapgames`, gamesInfo)
        .then((res) => {})
        .catch((error) => console.log(error));
    }

    axios
      .put(`${API}/trades/updatetrade`, offeredRequest)
      .then((res) => {
        setOfferInfo(offeredRequest);
      })
      .catch((error) => console.log(error));
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  let dateString = offeredRequest.created_at;

  console.log("offered made", offeredRequest);
  return (
    <div>
      <ul>
        <h5>Trade Offer Date: {formatDate(dateString)}</h5>
        <h5>Trade Status: {offeredRequest.trade_success}</h5>
        <h5>
          {offeredRequest.offer_name} Complete Status:{" "}
          {offerInfo.trade_complete_from_offerer ? "True" : "false"}
        </h5>
        <h5>
          {offeredRequest.receiver_name} Complete Status:{" "}
          {offerInfo.trade_complete_from_receiver ? "True" : "false"}
        </h5>
        <p>
          {`${offeredRequest.offer_name} is offering ${offeredRequest.offerer_game_name} to switch ${offeredRequest.receiver_name}'s ${offeredRequest.receiver_game_name}`}
        </p>
      </ul>
      <button onClick={cancel}>Cancel</button>
      <button onClick={completeTrade}>Confirm Complete Trade</button>
      <br></br>

      <hr />
    </div>
  );
}
