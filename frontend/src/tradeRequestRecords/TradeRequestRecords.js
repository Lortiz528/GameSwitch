import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CurrentUserContext } from "../components/CurrentUserContext";
import { useContext } from "react";
import ReceivedRecord from "./ReceivedRecord";
import OfferedRecord from "./OfferedRecord";

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
  function displayTradeReceivedRecord(requests) {
    if (requests.length === 0) return [];

    return requests.map((request) => {
      return <ReceivedRecord receivedRequest={request} />;
    });
  }

  function displayTradeOfferedRecord(offers) {
    if (offers.length === 0) return [];

    return offers.map((offer) => {
      return <OfferedRecord offeredRequest={offer} />;
    });
  }

  // console.log(requests);
  // console.log(offers);

  return (
    <div>
      <h1>hello</h1>
      <h2>Requests I received</h2>
      <section>{displayTradeReceivedRecord(requests)}</section>
      <hr />
      <h2>Requests I sent</h2>
      <section>{displayTradeOfferedRecord(offers)}</section>

      <button>
        <Link to="/">Home</Link>
      </button>
    </div>
  );
}
