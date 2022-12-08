import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../components/CurrentUserContext';
import { useContext } from 'react';
import { Form, Image } from 'react-bootstrap';
import './UserProfileUpdate.css';

//API url
const API = process.env.REACT_APP_API_URL;

function UserProfileUpdate() {
  const { currentUser } = useContext(CurrentUserContext);
  //console.log(currentUser);

  const [userInput, setUserInput] = useState({
    user_name: '',
    user_location: '',
    user_avatar: '',
    user_bio: '',
    user_facebook: '',
    user_instagram: '',
    user_twitch: '',
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
  }, [currentUser.user_email]);
  const navigate = useNavigate();

  const updateProfile = () => {
    axios
      .put(`${API}/users/${currentUser.user_email}`, userInput)
      .then(() => {
        currentUser.user_name = userInput.user_name;
        currentUser.user_location = userInput.user_location;
        currentUser.user_avatar = userInput.user_avatar;
        currentUser.user_bio = userInput.user_bio;
        currentUser.user_facebook = userInput.user_facebook;
        currentUser.user_instagram = userInput.user_instagram;
        currentUser.user_twitch = userInput.user_twitch;
        navigate('/userprofile');
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
      <h2>Update Profile </h2>
      <Form onSubmit={handleSubmit} className="form">
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>UserName:</strong>{' '}
          </Form.Label>
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
          <Form.Label>
            <strong>Location:</strong>{' '}
          </Form.Label>
          <Form.Select
            type="text"
            id="user_location"
            value={userInput.user_location}
            onChange={handleTextChange}
            required
          >
            <option value="Manhattan">Manhattan</option>
            <option value="Queens">Queens</option>
            <option value="Staten Island">Staten Island</option>
            <option value="Bronx">Bronx</option>
            <option value="Brooklyn">Brooklyn</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Bio:</strong>{' '}
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="User Bio"
            id="user_bio"
            value={userInput.user_bio}
            onChange={handleTextChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Facebook:</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="facebook Url"
            id="user_facebook"
            value={userInput.user_facebook}
            onChange={handleTextChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Instagram:</strong>{' '}
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Instagram Url"
            id="user_instagram"
            value={userInput.user_instagram}
            onChange={handleTextChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Twitch:</strong>{' '}
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Twitch Url"
            id="user_Twitch"
            value={userInput.user_twitch}
            onChange={handleTextChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Avatar:</strong>{' '}
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Avatar Url"
            id="user_avatar"
            value={userInput.user_avatar}
            onChange={handleTextChange}
            required
          />
        </Form.Group>
        <Image src={userInput.user_avatar} alt={userInput.user_name} />
        <br></br>
        <br />
        {/* <button className='update-profile' type='submit'>
          Update Profile
        </button> */}
        <input
          className="update-profile"
          type="submit"
          value="update profile"
        />
      </Form>
      <br />

      <Link to="/userprofile">Go back</Link>

      <br></br>
    </section>
  );
}

export default UserProfileUpdate;
