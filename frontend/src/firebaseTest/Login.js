import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SignOut from "./Signout";
import { CurrentUserContext } from "../components/CurrentUserContext";
import { useContext } from "react";

//firebase import
import auth from "./firebaseAuth";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [userInput, setUserInput] = useState({
    user_email: "",
    user_password: "",
  });

  const currentUser = useContext(CurrentUserContext);

  const navigate = useNavigate();

  const logIn = () => {
    signInWithEmailAndPassword(
      auth,
      userInput.user_email,
      userInput.user_password
    )
      .then((cred) => {
        currentUser.setCurrentUser(cred.user.email);
        console.log(cred);
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
          <textarea
            id="user_password"
            value={userInput.user_password}
            type="password"
            onChange={handleTextChange}
            required
          />
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
