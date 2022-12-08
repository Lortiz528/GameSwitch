import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
//import from firebase
//import { onAuthStateChanged } from "firebase/auth";
//import auth from "../firebaseTest/firebaseAuth";
import axios from "axios";
import { CurrentUserContext } from "./CurrentUserContext";
import { useContext } from "react";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";
import "./UserProfile.css";
import GetTradeScore from "../tradeRequestRecords/getTradeScore";

const API = process.env.REACT_APP_API_URL; //localhost:3333

export default function UserProfile() {
  const { currentUser } = useContext(CurrentUserContext);
  console.log(currentUser);
  console.log(
    "trade score",
    currentUser.user_id,
    GetTradeScore(currentUser.user_id)
  );

  return (
    <div>
      <h2>{`${currentUser.user_name}'s Profile`}</h2>
      <Table striped bordered hover className="userprofile">
        <tbody>
          <tr>
            <td>
              <strong>Username:</strong>
            </td>
            <td>
              {" "}
              <div>
                {currentUser.hasOwnProperty("user_name")
                  ? currentUser.user_name
                  : "user name placeholder"}
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <strong>Avatar:</strong>
            </td>
            <td>
              <Image
                roundedCircle
                height={"200px"}
                src={currentUser.user_avatar}
                alt={currentUser.user_name}
              />
            </td>
          </tr>

          <tr>
            <td>
              <strong>Email:</strong>
            </td>
            <td>
              <div>
                {currentUser.hasOwnProperty("user_email")
                  ? currentUser.user_email
                  : "user email placeholder"}
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <strong>Location:</strong>
            </td>
            <td>
              <div>
                {currentUser.hasOwnProperty("user_location")
                  ? currentUser.user_location
                  : "user location placeholder"}
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Bio:</strong>
            </td>
            <td>
              <div>
                {currentUser.hasOwnProperty("user_bio")
                  ? currentUser.user_bio
                  : "user bio placeholder"}
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Game Switch Score:</strong>
            </td>
            <td>
              <div>
                {<GetTradeScore user_id={currentUser.user_id} />}
                {/* {GetTradeScore(currentUser.user_id) > 0
                  ? GetTradeScore(currentUser.user_id)
                  : "user trade score placeholder"} */}
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
      {currentUser.user_facebook ? (
        <a href={currentUser.user_facebook}>
          <Image
            style={{ width: "50px", margin: "10px" }}
            src="https://i.imgur.com/YeiuX4k.png"
          />
        </a>
      ) : null}
      {currentUser.user_instagram ? (
        <a href={currentUser.user_instagram}>
          <Image
            style={{ width: "50px", margin: "10px" }}
            src="https://i.imgur.com/dTKYTwR.png"
          />
        </a>
      ) : null}
      {currentUser.user_twitch ? (
        <a href={currentUser.user_twitch}>
          <Image
            style={{ width: "50px", margin: "10px" }}
            src="https://i.imgur.com/pSgUF1Y.jpg"
          />
        </a>
      ) : null}
      <br></br>
      <br></br>
      <button>
        <Link to="/resetpassword">Reset Password</Link>
      </button>
      <br></br>
      <br></br>
      <button>
        <Link to="/updateprofile">Update Profile</Link>
      </button>
      <br></br>
      <br></br>
      <button>
        <Link to="/gamecollection">Game Collection</Link>
      </button>
      <br></br>
      <br></br>
      <button>
        <Link to="/traderequestrecords">Trade Records</Link>
      </button>
    </div>
  );
}
