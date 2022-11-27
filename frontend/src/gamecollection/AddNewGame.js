import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../components/CurrentUserContext";
import { useContext } from "react";

//API url
const API = process.env.REACT_APP_API_URL;

function AddNewGame() {
  const { currentUser } = useContext(CurrentUserContext);

  //console.log("current user id is", currentUser.user_id);

  const [gameInfoInput, setGameInfoInput] = useState({
    game_name: "",
    game_img: "",
    game_rating: "",
    game_description: "",
    game_brand: "",
    game_console: "",
  });

  const navigate = useNavigate();

  const AddNewGameToDataBase = () => {
    const newGame = { ...gameInfoInput };
    newGame.user_id = currentUser.user_id;

    axios
      .post(`${API}/loggedin/${currentUser.user_id}/games`, newGame)
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
    AddNewGameToDataBase();
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
      <h2>Add New Game Page</h2>
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
          <input type="submit" value="Add New Game" />
        </button>
      </form>
      <hr />
      <Link to="/">Home</Link>
    </section>
  );
}

export default AddNewGame;
