import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../components/CurrentUserContext";
import { useContext } from "react";

//API url
const API = process.env.REACT_APP_API_URL;

function UserProfileUpdate() {
  const { currentUser } = useContext(CurrentUserContext);
  //console.log(currentUser);

  const [userInput, setUserInput] = useState({
    user_name: "",
    user_trade_score: "",
    user_location: "",
    user_avatar: "",
  });

  const navigate = useNavigate();

  const updateProfile = () => {
    axios
      .put(`${API}/users/${currentUser.user_email}`, userInput)
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("catch", error));
  };

  const handleTextChange = (event) => {
    setUserInput({ ...userInput, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile();
    setUserInput({
      user_password: "",
      user_confirmPassWord: "",
    });
  };

  //  [user_name, user_trade_score, user_location, user_avatar, email]

  return (
    <section>
      <h2>Update Profile Page</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <h2>Email: {currentUser.user_email}</h2>
        </div>
        <br />
        <div>
          <label htmlFor="user_name">User Name: </label>
          <input
            id="user_name"
            value={userInput.user_name}
            type="text"
            onChange={handleTextChange}
            required
          ></input>
        </div>
        <br />
        <div>
          <label htmlFor="user_trade_score">Trade Score: </label>
          <input
            id="user_trade_score"
            value={userInput.user_trade_score}
            type="text"
            onChange={handleTextChange}
            required
          ></input>
        </div>
        <br />
        <div>
          <label htmlFor="user_location">Location: </label>
          <input
            id="user_location"
            value={userInput.user_location}
            type="text"
            onChange={handleTextChange}
            required
          ></input>
        </div>
        <br />
        <div>
          <label htmlFor="user_avatar">Avatar: </label>
          <input
            id="user_avatar"
            value={userInput.user_avatar}
            type="text"
            onChange={handleTextChange}
            required
          ></input>
        </div>
        <br />
        <button>
          <input type="submit" value="Update Profile" />
        </button>
      </form>
      <br></br>
      <button>
        {" "}
        <Link to="/login">Login</Link>
      </button>
      <br></br>
      <br></br>
      <button>
        {" "}
        <Link to="/">Home</Link>
      </button>
      <hr />
    </section>
  );
}

export default UserProfileUpdate;
