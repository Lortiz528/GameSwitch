import {
  Button,
  Modal,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { CurrentUserContext } from "./CurrentUserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import submitSound from "../mixkit-bonus-earned-in-video-game-2058.wav";
import axios from "axios";
import "./TradeRequest.css";
import { MdOutlineSync } from "react-icons/md";

const API = process.env.REACT_APP_API_URL;

function TradeRequest({
  show,
  handleClose,
  findUserName,
  user,
  currentGameInfo,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [game, setGame] = useState([]);
  const [selectGame, setSelectGame] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/games`)
      .then((res) => {
        setGame(res.data.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const playAudio = () => {
    new Audio(submitSound).play();
  };
  let userImage = (users) => {
    for (let user of users) {
      if (user.user_name === findUserName) {
        return user.user_avatar;
      }
    }
  };

  const receiverUserId = currentGameInfo.user_id;
  const receiverGameId = currentGameInfo.game_id;
  // console.log('currentuserId:', currentUser.user_id)
  // console.log('currentuser gameid', selectGame)
  // console.log('reciever userid:', receiverUserId)
  // console.log('receiver gameid', receiverGameId)
  const handleClick = () => {
    let allId = {};
    allId.trade_offerer_user_id = currentUser.user_id;
    allId.trade_offerer_game_id = parseInt(selectGame);
    allId.trade_receiver_game_id = receiverGameId;
    allId.trade_receiver_user_id = receiverUserId;
    allId.trade_complete_from_offerer = false;
    allId.trade_complete_from_receiver = false;

    axios
      .post(`${API}/trades/newtrade`, allId)
      .then(() => {
        playAudio();
        notify();
      })
      .catch((error) => console.log(error));
  };
  const notify = () => {
    toast.success(
      "Congrats on trading this is your first step! \n You will be redirected in 2 seconds.",
      {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
      }
    );
    setTimeout(() => {
      navigate("/traderequestrecords");
    }, 3100);
  };

  const offerGameImg = (games, selecting) => {
    for (let game of games) {
      if (game.game_id === Number(selecting)) {
        return game.game_img;
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-200w">
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
                  <br />
                  <Form.Select
                    value={selectGame}
                    onChange={(e) => setSelectGame(e.target.value)}
                  >
                    <option>Select Game</option>
                    {game
                      .filter((game) => game.user_id === currentUser.user_id)
                      .map((game) => (
                        <option value={game.game_id} key={game.game_id}>
                          {game.game_name}
                        </option>
                      ))}
                  </Form.Select>
                </Card.Body>
                {offerGameImg(game, selectGame) ? (
                  <Card.Img
                    src={offerGameImg(game, selectGame)}
                    width={20}
                    height={250}
                  />
                ) : null}
              </Card>
            </Col>
            <MdOutlineSync className="icons" />
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>{findUserName}</Card.Title>
                  <Card.Img src={userImage(user)} />
                  <Card.Text>{currentGameInfo.game_name}</Card.Text>
                </Card.Body>
                <Card.Img
                  src={currentGameInfo.game_img}
                  width={20}
                  height={250}
                />
              </Card>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={handleClick}>
          Submit
        </Button>
        <ToastContainer autoClose={2000} theme="light" />
      </Modal.Footer>
    </Modal>
  );
}

export default TradeRequest;
