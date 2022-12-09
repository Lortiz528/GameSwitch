import React from "react";
import SignOut from "../firebaseTest/Signout";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { setLogLevel } from "firebase/app";
import { Card, Row, Container, Button } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify'

const API = process.env.REACT_APP_API_URL; //localhost:3333

export default function ReceivedRecord({ receivedRequest }) {
  const [status, setStatus] = useState(receivedRequest.trade_success);
  // const [offerCompleteStatus, setOfferCompleteStatus] = useState(
  //   receivedRequest.trade_complete_from_offerer
  // );
  const [request, setRequest] = useState(receivedRequest);
  const navigate = useNavigate();
  const accept = () => {
    const acceptRequest = {};
    acceptRequest.trade_success = "accepted";
    acceptRequest.trade_id = receivedRequest.trade_id;

    axios
      .put(`${API}/trades/updatetrade`, acceptRequest)
      .then((res) => {
        setStatus("accepted");
        notify()
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
  const notify = () => {
    toast.success('You have accepted the trade! Please contact the user to coordinate switching games!', {
      position: 'top-center',
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      draggable: true,
      progress: undefined,
    })
    setTimeout(() => {
      navigate("/userprofile")
    }, 3100)
  }
  return (
    <Card style={{ width: "20rem", textAlign: "left" }}>
      <Card.Body>
        <Card.Title>Trade Offer Date: {formatDate(dateString)}</Card.Title>
        <h5>Trade Status: {status}</h5>
        <Card.Title>
          {receivedRequest.offer_name} Complete Status:
          {request.trade_complete_from_offerer ? "True" : "false"}
        </Card.Title>
        <Card.Title>
          {receivedRequest.receiver_name} Complete Status:
          {request.trade_complete_from_receiver ? "True" : "false"}
        </Card.Title>
        <Card.Text>
          {`${receivedRequest.offer_name} Offered ${receivedRequest.offerer_game_name} for ${receivedRequest.receiver_name}'s Copy of ${receivedRequest.receiver_game_name}`}
        </Card.Text>

        {receivedRequest.trade_success === "completed" ? null : (
          <Button variant="primary" onClick={accept}>
            Accept
          </Button>
        )}
        <br></br>
        <br></br>

        {receivedRequest.trade_success === "completed" ? null : (
          <Button variant="warning" onClick={reject}>
            Reject
          </Button>
        )}
        <br></br>
        <br></br>
        <ToastContainer autoClose={2000} theme='light' />
        {receivedRequest.trade_success === "pending" ||
        receivedRequest.trade_success === "rejected" ? null : (
          <Button variant="success" onClick={completeTrade}>
            Confirm Complete Trade
          </Button>
          
        )}
      </Card.Body>
    </Card>
  );
}
