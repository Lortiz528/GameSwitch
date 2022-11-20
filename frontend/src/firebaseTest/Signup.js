import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

//firebase import
import auth from "./firebaseAuth";
import { createUserWithEmailAndPassword } from "firebase/auth";

//API url
const API = process.env.REACT_APP_API_URL;

function Signup() {
  const [userInput, setUserInput] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_confirmPassWord: "",
  });

  const navigate = useNavigate();

  const signUp = () => {
    if (userInput.user_password === userInput.user_confirmPassWord) {
      createUserWithEmailAndPassword(
        auth,
        userInput.user_email,
        userInput.user_password
      )
        .then((cred) => {
          console.log(cred);
          alert("you have signed up", cred);
          createNewUser();
        })
        .catch((error) => {
          console.log(error.message);
          alert(error.message);
        });
    } else {
      alert("Password not match");
    }
  };

  const createNewUser = () => {
    axios
      .post(`${API}/users/newuser`, userInput)
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
    signUp();
    setUserInput({
      user_name: "",
      user_email: "",
      user_password: "",
      user_confirmPassWord: "",
    });
  };

  return (
    <section>
      <h2>Sign Up Page</h2>
      <form onSubmit={handleSubmit} className="form">
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
          <label htmlFor="user_email">Email: </label>
          <input
            id="user_email"
            value={userInput.user_email}
            type="text"
            onChange={handleTextChange}
            required
          ></input>
        </div>
        <br />
        <div>
          <label htmlFor="user_password">Password: </label>
          <textarea
            id="user_password"
            value={userInput.user_password}
            type="password"
            onChange={handleTextChange}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="user_confirmPassword">Password: </label>
          <textarea
            id="user_confirmPassWord"
            value={userInput.user_confirmPassWord}
            type="password"
            onChange={handleTextChange}
            required
          />
        </div>
        <br />

        <button>
          <input type="submit" value="Sign Up" />
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

export default Signup;
