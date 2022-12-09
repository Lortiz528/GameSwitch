import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
//import from firebase
//import { onAuthStateChanged } from "firebase/auth";
//import auth from "../firebaseTest/firebaseAuth";
import axios from 'axios';
import { CurrentUserContext } from './CurrentUserContext';
import { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import { Button, Card, Container } from 'react-bootstrap';
import './UserProfile.css';
import GetTradeScore from '../tradeRequestRecords/getTradeScore';

const API = process.env.REACT_APP_API_URL; //localhost:3333

export default function UserProfile() {
  const { currentUser } = useContext(CurrentUserContext);
  // console.log(currentUser);
  // console.log(
  //   "trade score",
  //   currentUser.user_id,
  //   GetTradeScore(currentUser.user_id)
  // );

  return (
    <Container>
      <h2>{`${currentUser.user_name}'s Profile`}</h2>
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title>{currentUser.user_name}</Card.Title>
          <Card.Img
            variant="top"
            style={{ width: '200px' }}
            src={currentUser.user_avatar}
          />
          <br></br>
          <br></br>
          <Card.Subtitle>
            Email:{' '}
            {currentUser.hasOwnProperty('user_email')
              ? currentUser.user_email
              : 'user email placeholder'}
          </Card.Subtitle>
          <br></br>

          <Card.Subtitle>Location: {currentUser.user_location}</Card.Subtitle>
          <br></br>
          <Card.Subtitle>{currentUser.user_bio}</Card.Subtitle>
          <br></br>
          <Card.Subtitle>
            Game Switch Score: {<GetTradeScore user_id={currentUser.user_id} />}
          </Card.Subtitle>

          <Card.Text></Card.Text>
        </Card.Body>
      </Card>

      {currentUser.user_facebook ? (
        <a href={currentUser.user_facebook}>
          <Image
            style={{ width: '50px', margin: '10px' }}
            src="https://i.imgur.com/YeiuX4k.png"
          />
        </a>
      ) : null}
      {currentUser.user_instagram ? (
        <a href={currentUser.user_instagram}>
          <Image
            style={{ width: '50px', margin: '10px' }}
            src="https://i.imgur.com/dTKYTwR.png"
          />
        </a>
      ) : null}
      {currentUser.user_twitch ? (
        <a href={currentUser.user_twitch}>
          <Image
            style={{ width: '50px', margin: '10px' }}
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
    </Container>
  );
}
