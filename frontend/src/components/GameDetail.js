import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const API = process.env.REACT_APP_API_URL
function GameDetail() {
  const { gameId } = useParams()
  const [game, setGame] = useState([])
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

  return (
    <div>
      <p>Game Name: {game.game_name}</p>
      <img src={game.game_img} alt='game pic' width={200} />
      <p>Description: {game.game_description}</p>
      <p>Game Brand: {game.game_brand}</p>
      <p>Game Console: {game.game_console}</p>
    </div>
  )
}
export default GameDetail
