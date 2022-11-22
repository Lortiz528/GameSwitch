import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SignOut from "./Signout";
import { CurrentUserContext } from "../components/CurrentUserContext";
import { useContext } from "react";
import axios from "axios";

//firebase import
import auth from "./firebaseAuth";
import { signInWithEmailAndPassword } from "firebase/auth";

const API = process.env.REACT_APP_API_URL; //localhost:3333

function Login() {
  const [userInput, setUserInput] = useState({
    user_email: "",
    user_password: "",
  });

  const currentUser = useContext(CurrentUserContext);

  function setUserInfo(email) {
    //console.log("email", email);
    axios
      .get(`${API}/users/${email}`)
      .then((res) => {
        currentUser.setCurrentUser(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const navigate = useNavigate();

  const logIn = () => {
    signInWithEmailAndPassword(
      auth,
      userInput.user_email,
      userInput.user_password
    )
      .then((cred) => {
        const email = cred.user.email;
        //console.log(email);
        setUserInfo(email);
        //console.log(cred);
        alert("you have logged in", cred);
        navigate("/userprofile");
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  const handleTextChange = (event) => {
    setUserInput({ ...userInput, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    logIn();
    setUserInput({
      user_email: "",
      user_password: "",
    });
  };

  return (
    <section>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit} className="form">
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
          <input
            id="user_password"
            value={userInput.user_password}
            type="password"
            onChange={handleTextChange}
            required
          ></input>
        </div>
        <br />
        <br />
        <button>
          <input type="submit" value="Login" />
        </button>
      </form>
      <br></br>
      <SignOut />
      <button>
        {" "}
        <Link to="/">Home</Link>
      </button>

      <hr />
    </section>
  );
}

export default Login;
