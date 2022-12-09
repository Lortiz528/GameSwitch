import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from './CurrentUserContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import TradeRequest from './TradeRequest';
import { Container, Row, Col } from 'react-bootstrap';
import './GameDetail.css';
const API = process.env.REACT_APP_API_URL;

function GameDetail() {
  const { gameId } = useParams();
  const { currentUser } = useContext(CurrentUserContext);
  const [game, setGame] = useState([]);
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/games/${gameId}`)
      .then((res) => {
        setGame(res.data.payload);
      })
      .catch(() => {
        navigate('/not-found');
      });
  }, [gameId, navigate]);

  useEffect(() => {
    axios
      .get(`${API}/users`)
      .then((res) => {
        setUser(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const findUserName = (users) => {
    for (let user of users) {
      if (user.user_id === game.user_id) {
        return user.user_name;
      }
    }
  };

  const findUserEmail = (users) => {
    for (let user of users) {
      if (user.user_id === game.user_id) {
        return user.user_email;
      }
    }
  };

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div>
      <Container fluid className="mt-4">
        <Row>
          <Col>
            <img
              className="game-img"
              src={game.game_img}
              alt="game pic"
              height={500}
            />
          </Col>
          <Col>
            <div className="game-detail">
              <h2>{game.game_name}</h2>
              <p className="description">
                <strong>Description:</strong> {game.game_description}
              </p>
              <p>
                <strong>Brand:</strong> {game.game_brand}
              </p>
              <p>
                <strong>Console:</strong> {game.game_console}
              </p>
              <p>
                <strong>Owner: </strong>
                <Link to={`/users/${findUserEmail(user)}`}>
                  {findUserName(user)}
                </Link>{' '}
              </p>
              {currentUser.user_name !== findUserName(user) &&
              currentUser.user_name ? (
                <button onClick={handleOpen} className='game-detail-button'>offer trade</button>
              ) : null}
              {!currentUser.user_name ? (
                <Link to="/signup">Sign up or Log in to offer trade</Link>
              ) : null}
              <TradeRequest
                handleClose={handleClose}
                show={show}
                findUserName={findUserName(user)}
                user={user}
                currentGameInfo={game}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default GameDetail;
