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
  function displayTradeReceivedRecord(requests) {
    if (requests.length === 0) return [];

    // return tradeRecords.map((tradeRecord) => {
    //   let dateString = tradeRecord.created_at;
    //   const formatDate = (dateString) => {
    //     const options = { year: "numeric", month: "long", day: "numeric" };
    //     return new Date(dateString).toLocaleDateString(undefined, options);
    //   };
    //   // console.log(tradeRecord)
    //   // console.log(formatDate(dateString))
    //   return (
    //     <div>
    //       <ul>
    //         <h5>Trade Offer Date: {formatDate(dateString)}</h5>
    //         <p>
    //           {`${tradeRecord.offer_name}is offering ${tradeRecord.offerer_game_name} to switch ${tradeRecord.receiver_name}'s ${tradeRecord.receiver_game_name}`}
    //         </p>
    //       </ul>
    //     </div>
    //   );
    // });
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
      {/* <section>{displayTradeRecord(offers)}</section> */}

      <button>
        <Link to="/">Home</Link>
      </button>
    </div>
  );
}
