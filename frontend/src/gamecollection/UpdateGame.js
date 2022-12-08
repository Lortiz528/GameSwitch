import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams ,Link} from 'react-router-dom'
import { CurrentUserContext } from '../components/CurrentUserContext'
import { useContext } from 'react'
import { Form } from 'react-bootstrap'
import './UpdateGame.css'

//API url
const API = process.env.REACT_APP_API_URL

function UpdateGame() {
  const { currentUser } = useContext(CurrentUserContext)

  const { gameid } = useParams()

  //console.log(gameid);

  //console.log("current user id is", currentUser.user_id);

  const [gameInfoInput, setGameInfoInput] = useState({
    game_name: '',
    game_img: '',
    game_description: '',
    game_brand: '',
    game_console: '',
  })

  useEffect(() => {
    axios
      .get(`${API}/loggedin/${currentUser.user_id}/games/${gameid}`)
      .then((response) => {
        setGameInfoInput(response.data.payload[0])
      })
      .catch((error) => console.error('catch', error))
  }, [gameid])

  const navigate = useNavigate()

  const UpdateGameInDataBase = () => {
    const updatedGame = { ...gameInfoInput }
    updatedGame.user_id = currentUser.user_id

    axios
      .put(
        `${API}/loggedin/${currentUser.user_id}/games/${gameid}`,
        updatedGame
      )
      .then(() => {
        navigate('/gamecollection')
      })
      .catch((error) => console.error('catch', error))
  }

  const handleTextChange = (event) => {
    setGameInfoInput({
      ...gameInfoInput,
      [event.target.id]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    UpdateGameInDataBase()
    setGameInfoInput({
      game_name: '',
      game_img: '',
      game_description: '',
      game_brand: '',
      game_console: '',
    })
  }

  return (
    <div className='update-game-form'>
      <h2>Update Game</h2>
      <br />
      <Form onSubmit={handleSubmit} className='form'>
        <div className='input'>
          <Form.Group className='mb-4'>
            <Form.Label htmlFor='game_name'>Game Name: </Form.Label>
            <Form.Control
              id='game_name'
              value={gameInfoInput.game_name}
              type='text'
              onChange={handleTextChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-4'>
            <Form.Label htmlFor='game_img'>Game Image: </Form.Label>
            <Form.Control
              id='game_img'
              value={gameInfoInput.game_img}
              type='text'
              onChange={handleTextChange}
              required
            />
          </Form.Group>

          <Form.Group className='mb-4'>
            <Form.Label htmlFor='game_description'>
              Game Description:{' '}
            </Form.Label>
            <Form.Control
              id='game_description'
              value={gameInfoInput.game_description}
              type='text'
              onChange={handleTextChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-4'>
            <Form.Label className='input' htmlFor='game_brand'>
              Game Brand:{' '}
            </Form.Label>
            <Form.Control
              id='game_brand'
              value={gameInfoInput.game_brand}
              type='text'
              onChange={handleTextChange}
              required
            />
          </Form.Group>
          <Form.Label htmlFor='game_console'>Game Console: </Form.Label>
          <Form.Control
            id='game_console'
            value={gameInfoInput.game_console}
            type='text'
            onChange={handleTextChange}
            required
          />
          <br />
        </div>

        <input className='update-button' type='submit' value='Update Game' />
      </Form>
      <br/>
      <button><Link to='/gamecollection'>Go Back</Link></button>
    </div>
  )
}

export default UpdateGame
