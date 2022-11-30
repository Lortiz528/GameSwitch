import { Button, Modal, Card, Form, Container, Row, Col } from 'react-bootstrap'
import { CurrentUserContext } from './CurrentUserContext'
import { useContext, useEffect, useState } from 'react'
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
  console.log(game)
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
                  <Form.Select>
                    <option>Select Game</option>
                    {game
                      .filter((game) => game.user_id === currentUser.user_id)
                      .map((game) => (
                        <option>{game.game_name}</option>
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
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TradeRequest
