import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { CurrentUserContext } from '../components/CurrentUserContext'
import { useContext } from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import './GameCollection.css'
const API = process.env.REACT_APP_API_URL //localhost:3333

export default function GameCollection() {
  const { currentUser } = useContext(CurrentUserContext)
  const [gameCollection, setGameCollection] = useState([])

  useEffect(() => {
    axios
      .get(`${API}/loggedin/${currentUser.user_id}/games`)
      .then((res) => {
        if (res.success) {
        }
        setGameCollection(res.data.payload)
      })
      .catch((error) => console.error('catch', error))
  }, [])

  function deleteGame(index, game_id) {
    const newGameCollection = [...gameCollection]
    newGameCollection.splice(index, 1)

    //console.log(newGameCollection);
    axios
      .delete(`${API}/loggedin/${currentUser.user_id}/games/${game_id}`)
      .then((res) => {
        setGameCollection(newGameCollection)
      })
      .catch((error) => console.error('catch', error))
  }

  const games = gameCollection.map((game, index) => {
    return (
      <Card key={index} style={{ width: '15rem' }} className='game'>
        <Card.Img
          src={game.game_img}
          style={{ height: '250px', width: '200px' }}
          className='gameimg'
        />
        <Card.Body>
          <Card.Title>{game.game_name}</Card.Title>
          <br />
          <button
            onClick={() => {
              deleteGame(index, game.game_id)
            }}
          >
            Delete Game
          </button>
          <br />
          <br />
          <Link to={`/updategame/${game.game_id}`}>
            <button>Update Game</button>
          </Link>
        </Card.Body>
      </Card>
    )
  })
  console.log(games)
  return (
    <Container>
      <Link to='/addnewgame'>
        <button>Add New Game</button>
      </Link>
      <Row className='gamerow'>
        {games.length !== 0 ? (
          games
        ) : (
          <img
            src='https://pa1.narvii.com/6721/8f5e4ae373279198ffc1bd980a52b52d4f9566ba_hq.gif'
            alt='gameover'
          />
        )}
      </Row>
    </Container>
  )
}
