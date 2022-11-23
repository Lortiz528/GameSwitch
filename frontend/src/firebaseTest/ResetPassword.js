import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../components/CurrentUserContext";
import { useContext } from "react";

//firebase import
import auth from "./firebaseAuth";
import { updatePassword } from "firebase/auth";

//API url
const API = process.env.REACT_APP_API_URL;

function ResetPassWord() {
  const { currentUser } = useContext(CurrentUserContext);
  //console.log(currentUser);

  const [userInput, setUserInput] = useState({
    user_password: "",
    user_confirmPassWord: "",
  });

  const navigate = useNavigate();

  const resetFireBasePassWord = () => {
    if (userInput.user_password === userInput.user_confirmPassWord) {
      updatePassword(auth.currentUser, userInput.user_password)
        .then((cred) => {
          //updateDatabasePassword();
          console.log(cred);
          alert("you have changed your password", cred);
        })
        .catch((error) => {
          console.log(error.message);
          alert(error.message);
        });
    } else {
      alert("Password not match");
    }
  };

  const updateDatabasePassword = () => {
    const update = { ...currentUser };
    update.user_password = userInput.user_password;
    console.log(update);

    axios
      .put(`${API}/users/${currentUser.user_email}`, update)
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
    resetFireBasePassWord();
    updateDatabasePassword();
    setUserInput({
      user_password: "",
      user_confirmPassWord: "",
    });
  };

  return (
    <section>
      <h2>Reset Password Page</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <h2>Email: {currentUser.user_email}</h2>
        </div>
        <br />
        <div>
          <label htmlFor="user_password">Password: </label>
          <input
            id="user_password"
            value={userInput.user_password}
            type="password"
            onChange={handleTextChange}
            required
          ></input>
        </div>
        <br />
        <div>
          <label htmlFor="user_confirmPassword">Password: </label>
          <input
            id="user_confirmPassWord"
            value={userInput.user_confirmPassWord}
            type="password"
            onChange={handleTextChange}
            required
          ></input>
        </div>
        <br />

        <button>
          <input type="submit" value="Update Password" />
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

export default ResetPassWord;
