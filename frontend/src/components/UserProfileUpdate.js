import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../components/CurrentUserContext';
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './UserProfileUpdate.css';

//API url
const API = process.env.REACT_APP_API_URL;

function UserProfileUpdate() {
  const { currentUser } = useContext(CurrentUserContext);
  //console.log(currentUser);

  const [userInput, setUserInput] = useState({
    user_name: '',
    user_trade_score: '',
    user_location: '',
    user_avatar: '',
  });

  useEffect(() => {
    axios
      .get(`${API}/users/${currentUser.user_email}`)
      .then((res) => {
        setUserInput(res.data.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const navigate = useNavigate();

  const updateProfile = () => {
    axios
      .put(`${API}/users/${currentUser.user_email}`, userInput)
      .then(() => {
        navigate('/');
      })
      .catch((error) => console.error('catch', error));
  };

  const handleTextChange = (event) => {
    setUserInput({ ...userInput, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile();
    setUserInput({
      user_password: '',
      user_confirmPassWord: '',
    });
  };

  //  [user_name, user_trade_score, user_location, user_avatar, email]

  return (
    <section className="userProfileUpdateForm">
      <h2>Update Profile Page</h2>
      <Form onSubmit={handleSubmit} className="form">
        <div>
          <h2>Email: {currentUser.user_email}</h2>
        </div>
        <Form.Group className="mb-3">
          <Form.Label>UserName: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            id="user_name"
            value={userInput.user_name}
            onChange={handleTextChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Location"
            id="user_location"
            value={userInput.user_location}
            onChange={handleTextChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Avatar: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Avatar Url"
            id="user_avatar"
            value={userInput.user_avatar}
            onChange={handleTextChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
      <br></br>
      <button>
        {' '}
        <Link to="/login">Login</Link>
      </button>
      <br></br>
      <br></br>
      <button>
        {' '}
        <Link to="/">Home</Link>
      </button>
      <hr />
    </section>
  );
}

export default UserProfileUpdate;
