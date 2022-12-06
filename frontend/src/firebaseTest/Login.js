import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SignOut from "./Signout";
import { CurrentUserContext } from "../components/CurrentUserContext";
import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";

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
        // alert("you have logged in", cred);
        notify();
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
  const notify = () => {
    toast.success("You have successfully logged in!", {
      position: "top-center",
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      navigate("/userprofile");
    }, 3100);
  };

  return (
    <section className="login">
      <h2 className="login-text">Login</h2>
      <br />
      <Form onSubmit={handleSubmit} className="loginForm">
        <Form.Group className="mb-3">
          <Form.Label className="label">Email </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            id="user_email"
            value={userInput.user_email}
            onChange={handleTextChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            id="user_password"
            value={userInput.user_password}
            onChange={handleTextChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <ToastContainer autoClose={2000} theme="light" />
      <br></br>
      <SignOut />
      {/* <button>
        {' '}
        <Link to='/'>Home</Link>
      </button> */}

      {/* <hr /> */}
    </section>
  );
}

export default Login;
