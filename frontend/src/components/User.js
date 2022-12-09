import axios from "axios";
import "./User.css";
import { Card, Container, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import { useContext } from "react";
import GetTradeScore from "../tradeRequestRecords/getTradeScore";
const API = process.env.REACT_APP_API_URL;

function User() {
  const { currentUser } = useContext(CurrentUserContext);
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
  }, [user_email, user.user_id]);

  const showGamesHandler = () => {
    axios.get(`${API}/loggedin/${user.user_id}/games`).then((res) => {
      setUserGames(res.data.payload);
    });
    setGamesVisible(!gamesVisible);
  };

  const showUserGames = userGames.map((game, idx) => {
    return (
      <Card key={idx} className="gameCard">
        <Link to={`/games/${game.game_id}`}>
          <Card.Img
            className="usergameImage"
            src={game.game_img}
            alt={game.game_name}
          />
        </Link>
        <Card.Title>{game.game_name}</Card.Title>
        <Card.Subtitle>
          {game.game_brand}-{game.game_console}
        </Card.Subtitle>
      </Card>
    );
  });
  // console.log(user);
  // console.log(currentUser);

  const displaySocialMediaIcons = () => {
    if (currentUser.user_name) {
      return (
        <div>
          {user.user_facebook ? (
            <a href={user.user_facebook}>
              <Image
                style={{ width: "50px", margin: "10px" }}
                src="https://i.imgur.com/YeiuX4k.png"
              />
            </a>
          ) : null}
          {user.user_instagram ? (
            <a href={user.user_instagram}>
              <Image
                style={{ width: "50px", margin: "10px" }}
                src="https://i.imgur.com/dTKYTwR.png"
              />
            </a>
          ) : null}
          {user.user_twitch ? (
            <a href={user.user_twitch}>
              <Image
                style={{ width: "50px", margin: "10px" }}
                src="https://i.imgur.com/pSgUF1Y.jpg"
              />
            </a>
          ) : null}
        </div>
      );
    } else {
      return <Link to="/signup">Sign up or Log in to view Social media</Link>;
    }
  };

  //console.log(displaySocialMediaIcons())
  console.log("user_id is", user.user_id);

  return (
    <Container className="userPage">
      <Card style={{ width: "27rem" }} className='user-cards'>
        <Card.Img src={user.user_avatar} />
        <Card.Body>
          <Card.Title>{user.user_name}</Card.Title>
          <br></br>
          <Card.Subtitle>
            Game Switcher Score: {<GetTradeScore user_id={user.user_id} />}
          </Card.Subtitle>
          <br></br>
          <Card.Subtitle>Location: {user.user_location}</Card.Subtitle>
          <Card.Text>{user.user_bio}</Card.Text>
          {displaySocialMediaIcons()}
          <br></br>
          <button className="user-button" onClick={showGamesHandler}>
            {!gamesVisible
              ? `${user.user_name}'s Games`
              : `Hide ${user.user_name}'s Games`}
          </button>
        </Card.Body>
      </Card>

      <div className="userGames">{gamesVisible ? showUserGames : null}</div>
    </Container>
  );
}

export default User;
