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

const API = process.env.REACT_APP_API_URL; //localhost:3333

export default function UserProfile() {
  const { currentUser } = useContext(CurrentUserContext);
  console.log(currentUser);

  return (
    <div>
      <h2>User Profile</h2>
      <h3>UserName: </h3>
      <div>
        {currentUser.hasOwnProperty("user_name")
          ? currentUser.user_name
          : "user name placeholder"}
      </div>
      <h3>UserEmail: </h3>
      <div>
        {currentUser.hasOwnProperty("user_email")
          ? currentUser.user_email
          : "user email placeholder"}
      </div>
      <h3>User Location: </h3>
      <div>
        {currentUser.hasOwnProperty("user_location")
          ? currentUser.user_location
          : "user location placeholder"}
      </div>
      <h3>User Trade Score: </h3>
      <div>
        {currentUser.hasOwnProperty("user_trade_score")
          ? currentUser.user_trade_score
          : "user trade score placeholder"}
      </div>
      <h3>User Date Of Birth: </h3>
      <div>
        {currentUser.hasOwnProperty("user_date_of_birth")
          ? currentUser.user_date_of_birth
          : "user date of birth placeholder"}
      </div>
      <SignOut />

      <br></br>
      <br></br>
      <button>
        <Link to="/">Home</Link>
      </button>
    </div>
  );
}
