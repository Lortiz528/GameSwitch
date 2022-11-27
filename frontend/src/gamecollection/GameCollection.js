import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CurrentUserContext } from "../components/CurrentUserContext";
import { useContext } from "react";

const API = process.env.REACT_APP_API_URL; //localhost:3333

export default function GameCollection() {
  const { currentUser } = useContext(CurrentUserContext);
  const [gameCollection, setGameCollection] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/loggedin/${currentUser.user_id}/games`)
      .then((res) => {
        setGameCollection(res.data.payload);
      })
      .catch((error) => console.error("catch", error));
  }, []);

  const games = gameCollection.map((game) => {
    return (
      <section style={{ border: "2px solid gold", margin: "20px" }}>
        <Link to={`/gamecollection/${game.game_id}`}>
          <div>{game.game_name}</div>
          <img
            src={game.game_img}
            alt="img"
            style={{ height: "200px", width: "150px" }}
          />
        </Link>
        <br />
      </section>
    );
  });

  return (
    <seciton>
      <Link to="/addnewgame">
        <button>Add New Game</button>
      </Link>
      <div>{games.length !== 0 ? games : null}</div>
      <button>
        <Link to="/">Home</Link>
      </button>
    </seciton>
  );
}
