import React from "react";
import SignOut from "../firebaseTest/Signout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
//import from firebase
//import { onAuthStateChanged } from "firebase/auth";
//import auth from "../firebaseTest/firebaseAuth";
import axios from "axios";
import { CurrentUserContext } from "./CurrentUserContext";
import { useContext } from "react";
import Table from "react-bootstrap/Table";
import "./UserProfile.css";

const API = process.env.REACT_APP_API_URL; //localhost:3333

export default function UserProfile() {
  const { currentUser } = useContext(CurrentUserContext);
  console.log(currentUser);

  return (
    <div>
      <h2>User Profile</h2>
      <Table striped bordered hover className="userprofile">
        <tbody>
          <tr>
            <td>Username:</td>
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
            <td>Avatar:</td>
            <td>
              <img src={currentUser.user_avatar} alt={currentUser.user_name} />
            </td>
          </tr>

          <tr>
            <td>Email:</td>
            <td>
              <div>
                {currentUser.hasOwnProperty("user_email")
                  ? currentUser.user_email
                  : "user email placeholder"}
              </div>
            </td>
          </tr>

          <tr>
            <td>Location:</td>
            <td>
              <div>
                {currentUser.hasOwnProperty("user_location")
                  ? currentUser.user_location
                  : "user location placeholder"}
              </div>
            </td>
          </tr>

          <tr>
            <td>Trade Score:</td>
            <td>
              <div>
                {currentUser.hasOwnProperty("user_trade_score")
                  ? currentUser.user_trade_score
                  : "user trade score placeholder"}
              </div>
            </td>
          </tr>
        </tbody>
      </Table>

      <br></br>
      <SignOut />
      <br></br>
      <br></br>
      <button>
        <Link to="/">Home</Link>
      </button>
    </div>
  );
}
