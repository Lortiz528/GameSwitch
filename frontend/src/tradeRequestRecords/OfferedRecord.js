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
  const [status, setStatus] = useState(offeredRequest.trade_success);
  const [offerCompleteStatus, setOfferCompleteStatus] = useState(
    offeredRequest.trade_complete_from_offerer
  );
  const [receiverCompleteStatus, setReceiverCompleteStatus] = useState(
    offeredRequest.trade_complete_from_receiver
  );

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
    }

    axios
      .put(`${API}/trades/updatetrade`, offeredRequest)
      .then((res) => {
        setOfferCompleteStatus(res.data.payload.trade_complete_from_offerer);
      })
      .catch((error) => console.log(error));
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  let dateString = offeredRequest.created_at;

  return (
    <div>
      <ul>
        <h5>Trade Offer Date: {formatDate(dateString)}</h5>
        <h5>Trade Status: {status}</h5>
        <h5>
          {offeredRequest.offer_name} Complete Status:{" "}
          {offerCompleteStatus ? "True" : "false"}
        </h5>
        <h5>
          {offeredRequest.receiver_name} Complete Status:{" "}
          {receiverCompleteStatus ? "True" : "false"}
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
