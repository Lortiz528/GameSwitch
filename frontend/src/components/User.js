import axios from 'axios';
import './User.css';
import { Button, Card, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL;

function User() {
  const [gamesVisible, setGamesVisible] = useState(false);
  const [user, setUser] = useState([]);
  const [userGames, setUserGames] = useState([]);
  const { user_email } = useParams();
  //const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/users/${user_email}`)
      .then((res) => {
        setUser(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_email]);

  const showGamesHandler = () => {
    axios.get(`${API}/loggedin/${user.user_id}/games`).then((res) => {
      setUserGames(res.data.payload);
    });
    setGamesVisible(!gamesVisible);
  };

  const showUserGames = userGames.map((game, idx) => {
    return (
      <Card key={idx} className="gameCard">
        <Card.Link href={`/games/${game.game_id}`}>
          <Card.Img
            className="usergameImage"
            src={game.game_img}
            alt={game.game_name}
          />
        </Card.Link>
        <Card.Title>{game.game_name}</Card.Title>
        <Card.Subtitle>
          {game.game_brand}-{game.game_console}
        </Card.Subtitle>
      </Card>
    );
  });

  return (
    <Container className="userPage">
      <Card style={{ width: '27rem' }}>
        <Card.Img src={user.user_avatar} />
        <Card.Body>
          <Card.Title>{user.user_name}</Card.Title>
          <br></br>
          <Card.Subtitle>Trade Score: {user.user_trade_score}</Card.Subtitle>
          <br></br>
          <Card.Subtitle>Location: {user.user_location}</Card.Subtitle>
          <br></br>
          <Card.Text>{user.user_bio}</Card.Text>
          <Button variant="primary" onClick={showGamesHandler}>
            {!gamesVisible
              ? `${user.user_name}'s Games`
              : `Hide ${user.user_name}'s Games`}
          </Button>
        </Card.Body>
      </Card>

      <div className="userGames">{gamesVisible ? showUserGames : null}</div>
    </Container>
  );
}

export default User;
