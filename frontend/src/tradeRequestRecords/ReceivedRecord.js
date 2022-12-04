import React from "react";
import SignOut from "../firebaseTest/Signout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { setLogLevel } from "firebase/app";

const API = process.env.REACT_APP_API_URL; //localhost:3333

export default function ReceivedRecord({ receivedRequest }) {
  const [status, setStatus] = useState(receivedRequest.trade_success);

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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  let dateString = receivedRequest.created_at;

  return (
    <div>
      <ul>
        <h5>Trade Offer Date: {formatDate(dateString)}</h5>
        <h5>Trade Staus: {status}</h5>
        <p>
          {`${receivedRequest.offer_name} is offering ${receivedRequest.offerer_game_name} to switch ${receivedRequest.receiver_name}'s ${receivedRequest.receiver_game_name}`}
        </p>
      </ul>
      <button onClick={accept}>Accept</button>
      <br></br>
      <br></br>
      <button onClick={reject}>Reject</button>
      <hr />
    </div>
  );
}
