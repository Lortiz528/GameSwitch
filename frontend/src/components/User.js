import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

  const showUserGames = userGames.map((game) => {
    return (
      <div>
        <img src={game.game_img} alt={game.game_name} />
      </div>
    );
  });

  return (
    <div>
      <h1>{user.user_name}</h1>
      <img src={user.user_avatar} alt={user.user_name} />
      <h5>
        <strong>Trade Score:</strong> {user.user_trade_score}
      </h5>
      <h5>Location: {user.user_location}</h5>
      <span>
        <h5>Bio:</h5> 
        <p>{user.user_bio}</p>
      </span>

      <Button variant="primary" onClick={showGamesHandler}>
        {!gamesVisible
          ? `${user.user_name}'s Games`
          : `Hide ${user.user_name}'s Games`}
      </Button>
      <div>{gamesVisible ? showUserGames : null}</div>
    </div>
  );
}

export default User;
