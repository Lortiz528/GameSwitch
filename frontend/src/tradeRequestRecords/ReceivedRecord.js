import React from "react";
import SignOut from "../firebaseTest/Signout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { setLogLevel } from "firebase/app";

const API = process.env.REACT_APP_API_URL; //localhost:3333

export default function ReceivedRecord({ receivedRequest }) {
  const [status, setStatus] = useState(receivedRequest.trade_success);
  // const [offerCompleteStatus, setOfferCompleteStatus] = useState(
  //   receivedRequest.trade_complete_from_offerer
  // );
  const [request, setRequest] = useState(receivedRequest);

  const accept = () => {
    const acceptRequest = {};
    acceptRequest.trade_success = "accepted";
    acceptRequest.trade_id = receivedRequest.trade_id;

    axios
      .put(`${API}/trades/updatetrade`, acceptRequest)
      .then((res) => {
        setStatus("accepted");
      })
      .catch((error) => console.log(error));
  };

  const reject = () => {
    const rejectRequest = {};
    rejectRequest.trade_success = "rejected";
    rejectRequest.trade_id = receivedRequest.trade_id;

    axios
      .put(`${API}/trades/updatetrade`, rejectRequest)
      .then((res) => {
        setStatus("rejected");
      })
      .catch((error) => console.log(error));
  };

  const completeTrade = () => {
    receivedRequest.trade_complete_from_receiver = true;
    console.log("receivedRequest", receivedRequest);

    if (receivedRequest.trade_complete_from_offerer === true) {
      receivedRequest.trade_success = "Completed";
      //swap games here
      const gamesInfo = {};
      gamesInfo.offerer_id = receivedRequest.trade_offerer_user_id;
      gamesInfo.receiver_id = receivedRequest.trade_receiver_user_id;
      gamesInfo.offerer_game_id = receivedRequest.trade_offerer_game_id;
      gamesInfo.receiver_game_id = receivedRequest.trade_receiver_game_id;
      axios
        .put(`${API}/trades/swapgames`, gamesInfo)
        .then((res) => {
          // setRequest(res.data.payload);
          setStatus("Completed");
        })
        .catch((error) => console.log(error));
    }

    axios
      .put(`${API}/trades/updatetrade`, receivedRequest)
      .then((res) => {
        setRequest(res.data.payload);
      })
      .catch((error) => console.log(error));
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  let dateString = receivedRequest.created_at;

  console.log("request is", receivedRequest);

  return (
    <div>
      <ul>
        <h5>Trade Offer Date: {formatDate(dateString)}</h5>
        <h5>Trade Status: {status}</h5>
        <h5>
          {receivedRequest.offer_name} Complete Status:{" "}
          {request.trade_complete_from_offerer ? "True" : "false"}
        </h5>
        <h5>
          {receivedRequest.receiver_name} Complete Status:{" "}
          {request.trade_complete_from_receiver ? "True" : "false"}
        </h5>
        <p>
          {`${receivedRequest.offer_name} is offering ${receivedRequest.offerer_game_name} to switch ${receivedRequest.receiver_name}'s ${receivedRequest.receiver_game_name}`}
        </p>
      </ul>
      <button onClick={accept}>Accept</button>
      <br></br>
      <br></br>
      <button onClick={reject}>Reject</button>
      <br></br>
      <br></br>
      <button onClick={completeTrade}>Confirm Complete Trade</button>
      <hr />
    </div>
  );
}
