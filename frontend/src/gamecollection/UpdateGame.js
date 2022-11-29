import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../components/CurrentUserContext";
import { useContext } from "react";

//API url
const API = process.env.REACT_APP_API_URL;

function UpdateGame() {
  const { currentUser } = useContext(CurrentUserContext);

  const { gameid } = useParams();

  //console.log(gameid);

  //console.log("current user id is", currentUser.user_id);

  const [gameInfoInput, setGameInfoInput] = useState({
    game_name: "",
    game_img: "",
    game_rating: "",
    game_description: "",
    game_brand: "",
    game_console: "",
  });

  useEffect(() => {
    axios
      .get(`${API}/loggedin/${currentUser.user_id}/games/${gameid}`)
      .then((response) => {
        setGameInfoInput(response.data.payload[0]);
      })
      .catch((error) => console.error("catch", error));
  }, [gameid]);

  const navigate = useNavigate();

  const UpdateGameInDataBase = () => {
    const updatedGame = { ...gameInfoInput };
    updatedGame.user_id = currentUser.user_id;

    axios
      .post(`${API}/loggedin/${currentUser.user_id}/games`, updatedGame)
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("catch", error));
  };

  const handleTextChange = (event) => {
    setGameInfoInput({
      ...gameInfoInput,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    UpdateGameInDataBase();
    setGameInfoInput({
      game_name: "",
      game_img: "",
      game_rating: "",
      game_description: "",
      game_brand: "",
      game_console: "",
    });
  };

  return (
    <section>
      <h2>Update Game Info Page</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="game_name">Game Name: </label>
          <input
            id="game_name"
            value={gameInfoInput.game_name}
            type="text"
            onChange={handleTextChange}
            required
          ></input>
        </div>
        <br />
        <div>
          <label htmlFor="game_img">Game Image: </label>
          <input
            id="game_img"
            value={gameInfoInput.game_img}
            type="text"
            onChange={handleTextChange}
            required
          ></input>
        </div>
        <br />
        <div>
          <label htmlFor="game_rating">Game Rating: </label>
          <input
            id="game_rating"
            value={gameInfoInput.game_rating}
            type="number"
            onChange={handleTextChange}
            required
          ></input>
        </div>
        <br />
        <div>
          <label htmlFor="game_description">Game Description: </label>
          <input
            id="game_description"
            value={gameInfoInput.game_description}
            type="text"
            onChange={handleTextChange}
            required
          ></input>
        </div>
        <br />
        <div>
          <label htmlFor="game_brand">Game Brand: </label>
          <input
            id="game_brand"
            value={gameInfoInput.game_brand}
            type="text"
            onChange={handleTextChange}
            required
          ></input>
        </div>
        <br />

        <div>
          <label htmlFor="game_console">Game Console: </label>
          <input
            id="game_console"
            value={gameInfoInput.game_console}
            type="text"
            onChange={handleTextChange}
            required
          ></input>
        </div>
        <br />

        <button>
          <input type="submit" value="Update Game" />
        </button>
      </form>
      <hr />
      <Link to="/">Home</Link>
    </section>
  );
}

export default UpdateGame;
