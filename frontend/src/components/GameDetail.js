import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import TradeRequest from './TradeRequest'
const API = process.env.REACT_APP_API_URL

function GameDetail() {
  const { gameId } = useParams()
  const [game, setGame] = useState([])
  const [user, setUser] = useState([])
  const [show, setShow] = useState(false)
  let navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${API}/games/${gameId}`)
      .then((res) => {
        setGame(res.data.payload)
      })
      .catch(() => {
        navigate('/not-found')
      })
  }, [gameId, navigate])

  useEffect(() => {
    axios
      .get(`${API}/users`)
      .then((res) => {
        setUser(res.data.payload)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const findUserName = (users) => {
    for (let user of users) {
      if (user.user_id === game.user_id) {
        return user.user_name
      }
    }
  }

  const findUserEmail = (users) => {
    for (let user of users) {
      if (user.user_id === game.user_id) {
        return user.user_email
      }
    }
  }

  const handleOpen = () => setShow(true)
  const handleClose = () => setShow(false)

  return (
    <div>
      <p>Game Name: {game.game_name}</p>
      <img src={game.game_img} alt='game pic' width={200} />
      <p>Description: {game.game_description}</p>
      <p>Game Brand: {game.game_brand}</p>
      <p>Game Console: {game.game_console}</p>
      <p>
        UserName:{' '}
        <Link to={`/users/${findUserEmail(user)}`}>{findUserName(user)}</Link>{' '}
      </p>
      <button onClick={handleOpen}>offer trade</button>
      <TradeRequest
        handleClose={handleClose}
        show={show}
        findUserName={findUserName(user)}
        user={user}
        currentGameInfo={game}
      />
    </div>
  )
}
export default GameDetail
