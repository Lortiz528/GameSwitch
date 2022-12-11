import React from 'react'
import { Link } from 'react-router-dom'
//import from firebase
//import { onAuthStateChanged } from "firebase/auth";
//import auth from "../firebaseTest/firebaseAuth";
import axios from 'axios'
import { CurrentUserContext } from './CurrentUserContext'
import { useContext } from 'react'
import { Card, Container, Image } from 'react-bootstrap'
import './UserProfile.css'
import GetTradeScore from '../tradeRequestRecords/getTradeScore'

const API = process.env.REACT_APP_API_URL //localhost:3333

export default function UserProfile() {
  const { currentUser } = useContext(CurrentUserContext)
  // console.log(currentUser);
  // console.log(
  //   "trade score",
  //   currentUser.user_id,
  //   GetTradeScore(currentUser.user_id)
  // );

  return (
    <Container>
      <h2 className='pixel-font'>{`${currentUser.user_name}'s Profile`}</h2>
      <Card style={{ width: '20rem' }} className='userprofile'>
        <Card.Body>
          <Card.Title>{currentUser.user_name}</Card.Title>
          <Card.Img
            variant='top'
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
          {currentUser.user_facebook ? (
            <a href={currentUser.user_facebook}>
              <Image
                style={{ width: '50px', margin: '10px' }}
                src='https://i.imgur.com/YeiuX4k.png'
              />
            </a>
          ) : null}
          {currentUser.user_instagram ? (
            <a href={currentUser.user_instagram}>
              <Image
                style={{ width: '50px', margin: '10px' }}
                src='https://i.imgur.com/dTKYTwR.png'
              />
            </a>
          ) : null}
          {currentUser.user_twitch ? (
            <a href={currentUser.user_twitch}>
              <Image
                style={{ width: '50px', margin: '10px' }}
                src='https://i.imgur.com/pSgUF1Y.jpg'
              />
            </a>
          ) : null}
        </Card.Body>
      </Card>
      <br />

      <button className='user-profile-button'>
        <Link to='/resetpassword'>Reset Password</Link>
      </button>

      <button className='user-profile-button'>
        <Link to='/updateprofile'>Update Profile</Link>
      </button>

      <button className='user-profile-button'>
        <Link to='/gamecollection'>Game Collection</Link>
      </button>

      <button className='user-profile-button'>
        <Link to='/traderequestrecords'>Trade Records</Link>
      </button>
    </Container>
  )
}
