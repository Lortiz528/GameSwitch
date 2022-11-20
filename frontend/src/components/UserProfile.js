import React from "react";
import SignOut from "../firebaseTest/Signout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
//import from firebase
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebaseTest/firebaseAuth";
import axios from "axios";
import { CurrentUserContext } from "./CurrentUserContext";
import { useContext } from "react";

const API = process.env.REACT_APP_API_URL; //localhost:3333

export default function UserProfile() {
  const currentUser = useContext(CurrentUserContext);
  const [gameCollection, setGameCollection] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  //console.log("The current user", currentUser.currentUser);

  //   useEffect(() => {
  //     //const unsubscribe =
  //     onAuthStateChanged(auth, (user) => {
  //       currentUser.setCurrentUser({});
  //     });

  //     //return unsubscribe;
  //   }, []);

  useEffect(() => {
    console.log("useEffect hello");
    axios
      .get(`${API}/users/${currentUser.currentUser}`)
      .then((res) => {
        setUserInfo(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function displayGameCollection() {
    axios
      .get(`${API}/loggedin/${userInfo.user_id}/games`)
      .then((res) => {
        setGameCollection(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeDisplayGameCollection() {
    setGameCollection([]);
  }

  console.log("The current user", currentUser);

  return (
    <div>
      <h2>User Profile</h2>
      <div>{currentUser ? currentUser.currentUser : null}</div>
      <h2>email is:</h2>
      {/* current user is the object contains login user's personal email */}
      {/* {currentUser.email} */}
      <h3>user info from db:</h3>
      <div>{userInfo.user_location}</div>
      <div>{userInfo.user_trade_score}</div>
      <button onClick={displayGameCollection}>Display Game Collection</button>
      <button onClick={closeDisplayGameCollection}>Hide Game Collection</button>
      <div>
        {gameCollection
          ? gameCollection.map((game) => <div>{game.game_name}</div>)
          : null}
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
