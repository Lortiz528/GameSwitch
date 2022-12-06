import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
//import from firebase
//import { onAuthStateChanged } from "firebase/auth";
//import auth from "../firebaseTest/firebaseAuth";
import axios from 'axios'
import { CurrentUserContext } from './CurrentUserContext'
import { useContext } from 'react'
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'
import './UserProfile.css'

const API = process.env.REACT_APP_API_URL //localhost:3333

export default function UserProfile() {
  const { currentUser } = useContext(CurrentUserContext)
  console.log(currentUser)

  return (
    <div>
      <h2>{`${currentUser.user_name}'s Profile`}</h2>
      <Table striped bordered hover className='userprofile'>
        <tbody>
          <tr>
            <td>Username:</td>
            <td>
              {' '}
              <div>
                {currentUser.hasOwnProperty('user_name')
                  ? currentUser.user_name
                  : 'user name placeholder'}
              </div>
            </td>
          </tr>

          <tr>
            <td>Avatar:</td>
            <td>
              <Image
                roundedCircle
                height={'200px'}
                src={currentUser.user_avatar}
                alt={currentUser.user_name}
              />
            </td>
          </tr>

          <tr>
            <td>Email:</td>
            <td>
              <div>
                {currentUser.hasOwnProperty('user_email')
                  ? currentUser.user_email
                  : 'user email placeholder'}
              </div>
            </td>
          </tr>

          <tr>
            <td>Location:</td>
            <td>
              <div>
                {currentUser.hasOwnProperty('user_location')
                  ? currentUser.user_location
                  : 'user location placeholder'}
              </div>
            </td>
          </tr>
          <tr>
            <td>Bio:</td>
            <td>
              <div>
                {currentUser.hasOwnProperty('user_bio')
                  ? currentUser.user_bio
                  : 'user bio placeholder'}
              </div>
            </td>
          </tr>
          <tr>
            <td>Trade Score:</td>
            <td>
              <div>
                {currentUser.hasOwnProperty('user_trade_score')
                  ? currentUser.user_trade_score
                  : 'user trade score placeholder'}
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
      <br></br>
      <button>
        <Link to='/resetpassword'>Reset Password</Link>
      </button>
      <br></br>
      <br></br>
      <button>
        <Link to='/updateprofile'>Update Profile</Link>
      </button>
      <br></br>
      <br></br>
      <button>
        <Link to='/gamecollection'>Game Collection</Link>
      </button>
      <br></br>
      <br></br>
      <button>
        <Link to='/traderequestrecords'>Trade Records</Link>
      </button>
    </div>
  )
}
