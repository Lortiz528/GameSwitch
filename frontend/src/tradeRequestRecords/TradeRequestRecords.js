import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { CurrentUserContext } from '../components/CurrentUserContext'
import { useContext } from 'react'
import ReceivedRecord from './ReceivedRecord'
import OfferedRecord from './OfferedRecord'
import { Container, Button } from 'react-bootstrap'

const API = process.env.REACT_APP_API_URL //localhost:3333

export default function TradeRequestRecords() {
  const { currentUser } = useContext(CurrentUserContext)
  const [requests, setRequests] = useState([])
  const [offers, setOffers] = useState([])

  useEffect(() => {
    axios
      .get(`${API}/trades/${currentUser.user_id}/received`)
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          setRequests(res.data.payload)
        }
      })
      .catch((error) => {
        console.log(error)
        // navigate("/not-found");
      })
  }, [])

  useEffect(() => {
    axios
      .get(`${API}/trades/${currentUser.user_id}/offered`)
      .then((res) => {
        if (res.data.success) {
          setOffers(res.data.payload)
        }
      })
      .catch((error) => {
        console.log(error)
        // navigate("/not-found");
      })
  }, [])

  //display the name of receiver and offer, received and offered game name
  function displayTradeReceivedRecord(requests) {
    if (requests.length === 0) return []

    return requests.map((request) => {
      return <ReceivedRecord receivedRequest={request} />
    })
  }

  function displayTradeOfferedRecord(offerRecords) {
    if (offerRecords.length === 0) return []

    return offerRecords.map((offerRecord, index) => {
      return (
        <OfferedRecord
          index={index}
          offeredRequest={offerRecord}
          offers={offers}
          setOffers={setOffers}
        />
      )
    })
  }

  // console.log(requests);
  // console.log(offers);

  return (
    <Container>
      <Container>
        <h2 className='pixel-font'>Inbox</h2>
        <Container className='tradeCards'>
          {displayTradeReceivedRecord(requests)}
        </Container>
      </Container>
      <hr />
      <Container>
        <h2 className='pixel-font'>Outbox</h2>
        <Container className='tradeCards'>
          {displayTradeOfferedRecord(offers)}
        </Container>
      </Container>

      <Link to='/userprofile'>
        <Button>Go Back</Button>
      </Link>
    </Container>
  )
}

