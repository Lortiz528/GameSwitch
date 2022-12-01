import React from "react";
import SignOut from "../firebaseTest/Signout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CurrentUserContext } from "../components/CurrentUserContext";
import { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";

const API = process.env.REACT_APP_API_URL; //localhost:3333

export default function TradeRequestRecords() {
  const { currentUser } = useContext(CurrentUserContext);
  const [requests, setRequests] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/trades/${currentUser.user_id}/received`)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setRequests(res.data.payload);
        }
      })
      .catch((error) => {
        console.log(error);
        // navigate("/not-found");
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/trades/${currentUser.user_id}/offered`)
      .then((res) => {
        if (res.data.success) {
          setOffers(res.data.payload);
        }
      })
      .catch((error) => {
        console.log(error);
        // navigate("/not-found");
      });
  }, []);

  //display the name of receiver and offer, received and offered game name
  function displayTradeRecord(tradeRecords) {
    if (tradeRecords.length === 0) return [];

    console.log("hello");
    return tradeRecords.map((tradeRecord) => {
      return (
        <div>
          <ul>
            <li>trade_offerer_user_id: {tradeRecord.trade_offerer_user_id}</li>
            <li>trade_offerer_game_id: {tradeRecord.trade_offerer_game_id}</li>
            <li>
              trade_receiver_user_id: {tradeRecord.trade_receiver_user_id}
            </li>
            <li>
              trade_receiver_game_id: {tradeRecord.trade_receiver_game_id}
            </li>
            <li>status: {tradeRecord.trade_success}</li>
          </ul>
        </div>
      );
    });
  }

  console.log(requests);
  console.log(offers);

  return (
    <div>
      <h1>hello</h1>
      <h2>Requests I received</h2>
      <section>{displayTradeRecord(requests)}</section>
      <hr />
      <h2>Requests I sent</h2>
      <section>{displayTradeRecord(offers)}</section>

      <button>
        <Link to="/">Home</Link>
      </button>
    </div>
  );
}
