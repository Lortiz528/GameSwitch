import { Button, Modal, Card, Form, Container, Row, Col } from 'react-bootstrap'
import { CurrentUserContext } from './CurrentUserContext'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const API = process.env.REACT_APP_API_URL

function TradeRequest({
  show,
  handleClose,
  findUserName,
  user,
  currentGameInfo,
}) {
  const { currentUser } = useContext(CurrentUserContext)
  const [game, setGame] = useState([])
  const [selectGame, setSelectGame] = useState('')
  let navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${API}/games`)
      .then((res) => {
        setGame(res.data.payload)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  let image = (users) => {
    for (let user of users) {
      if (user.user_name === findUserName) {
        return user.user_avatar
      }
    }
  }

  const receiverUserId = currentGameInfo.user_id
  const receiverGameId = currentGameInfo.game_id
  // console.log('currentuserId:', currentUser.user_id)
  // console.log('currentuser gameid', selectGame)
  // console.log('reciever userid:', receiverUserId)
  // console.log('receiver gameid', receiverGameId)
  const handleClick = () => {
    let allId = {}
    allId.trade_offerer_user_id = currentUser.user_id
    allId.trade_offerer_game_id = parseInt(selectGame)
    allId.trade_receiver_game_id = receiverGameId
    allId.trade_receiver_user_id = receiverUserId

    axios
      .post(`${API}/trades/newtrade`, allId)
      .then(() => {
        alert('you successfully made a trade request')
        navigate(`/`)
      })
      .catch((error) => console.log(error))
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Trade Offer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {currentUser.user_name ? currentUser.user_name : null}
                  </Card.Title>
                  <Card.Img src={currentUser.user_avatar} />
                  <Form.Select
                    value={selectGame}
                    onChange={(e) => setSelectGame(e.target.value)}
                  >
                    <option>Select Game</option>
                    {game
                      .filter((game) => game.user_id === currentUser.user_id)
                      .map((game) => (
                        <option value={game.game_id}>{game.game_name}</option>
                      ))}
                  </Form.Select>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>{findUserName}</Card.Title>
                  <Card.Img src={image(user)} />
                  <Card.Text>{currentGameInfo.game_name}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Cancel
        </Button>
        <Button variant='secondary' onClick={handleClick}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TradeRequest
