import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { setLogLevel } from 'firebase/app'
import { Card, Row, Container, Button } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'

const API = process.env.REACT_APP_API_URL //localhost:3333

export default function OfferedRecord({
  offeredRequest,
  offers,
  setOffers,
  index,
}) {
  const [offerInfo, setOfferInfo] = useState(offeredRequest)
  let navigate = useNavigate()
  const cancel = () => {
    const gameOffers = [...offers]
    gameOffers.splice(index, 1)
    axios
      .delete(`${API}/trades/${offeredRequest.trade_id}`)
      .then((res) => {
        setOffers(gameOffers)
      })
      .catch((error) => console.log(error))
  }

  const notify = () => {
    toast.success('Trade Complete! Now your game collection will be updated.', {
      position: 'top-center',
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      draggable: true,
      progress: undefined,
    })
    setTimeout(() => {
      navigate('/gamecollection')
    }, 3100)
  }

  const completeTrade = () => {
    offeredRequest.trade_complete_from_offerer = true
    console.log('offeredRequest', offeredRequest)

    if (offeredRequest.trade_complete_from_receiver === true) {
      offeredRequest.trade_success = 'Completed'
      //swap the games here
      const gamesInfo = {}
      gamesInfo.offerer_id = offeredRequest.trade_offerer_user_id
      gamesInfo.receiver_id = offeredRequest.trade_receiver_user_id
      gamesInfo.offerer_game_id = offeredRequest.trade_offerer_game_id
      gamesInfo.receiver_game_id = offeredRequest.trade_receiver_game_id

      axios
        .put(`${API}/trades/swapgames`, gamesInfo)
        .then((res) => {
          // setOfferInfo(offeredRequest)
        })
        .catch((error) => console.log(error))
    }

    setOfferInfo(offeredRequest)

    axios
      .put(`${API}/trades/updatetrade`, offeredRequest)
      .then((res) => {
        // setOfferInfo(offeredRequest);
      })
      .catch((error) => console.log(error))
    notify()
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  let dateString = offeredRequest.created_at

  console.log('offered made', offeredRequest)
  return (
    <Card style={{ width: '20rem', textAlign: 'left' }}>
      <Card.Body>
        <Card.Title>Trade Offer Date: {formatDate(dateString)}</Card.Title>
        <h5>Trade Status: {offeredRequest.trade_success}</h5>
        <Card.Title>
          {offeredRequest.offer_name} Complete Status:{' '}
          {offerInfo.trade_complete_from_offerer ? 'True' : 'false'}
        </Card.Title>
        <Card.Title>
          {offeredRequest.receiver_name} Complete Status:{' '}
          {offerInfo.trade_complete_from_receiver ? 'True' : 'false'}
        </Card.Title>
        <Card.Text>
          <span>{`${offeredRequest.offer_name} Offered `}</span>
          <span>
            <Link
              to={`/games/${offeredRequest.trade_offerer_game_id}`}
            >{`${offeredRequest.offerer_game_name} `}</Link>
            {'for '}
          </span>
          <span>{`${offeredRequest.receiver_name}'s Copy of `}</span>
          <span>
            <Link
              to={`/games/${offeredRequest.trade_receiver_game_id}`}
            >{`${offeredRequest.receiver_game_name}`}</Link>
          </span>
        </Card.Text>

        {offeredRequest.trade_success === 'accepted' ||
        offeredRequest.trade_success === 'Completed' ? null : (
          <Button variant='light' onClick={cancel}>
            Cancel
          </Button>
        )}
        <br></br>
        <br></br>
        {offeredRequest.trade_success === 'rejected' ||
        offeredRequest.trade_success === 'pending' ||
        offeredRequest.trade_success === 'Completed' ? null : (
          <Button variant='success' onClick={completeTrade}>
            Confirm Complete Trade
          </Button>
        )}
      </Card.Body>
      <ToastContainer autoClose={2000} theme='light' />
    </Card>
  )
}
