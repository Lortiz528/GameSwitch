import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { setLogLevel } from "firebase/app";

const API = process.env.REACT_APP_API_URL; //localhost:3333

export default function OfferedRecord({ offeredRequest }) {
  const [status, setStatus] = useState(offeredRequest.trade_success);

  const cancel = () => {
    axios
      .delete(`${API}/trades/${offeredRequest.trade_id}`)
      .then((res) => {})
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
        <h5>Trade Staus: {status}</h5>
        <p>
          {`${offeredRequest.offer_name} is offering ${offeredRequest.offerer_game_name} to switch ${offeredRequest.receiver_name}'s ${offeredRequest.receiver_game_name}`}
        </p>
      </ul>
      <button onClick={cancel}>Cancel</button>
      <br></br>

      <hr />
    </div>
  );
}
