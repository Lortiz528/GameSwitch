import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const API = process.env.REACT_APP_API_URL;

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/users`)
      .then((res) => {
        setUsers(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const allUsers = users.map((user, index) => {
    return (
      <div className="usercard" key={index}>
        <Link to={`/users/${user.user_email}`}>
          <img src={user.user_avatar} alt={user.user_name} />
        </Link>

        <h3>
          {user.user_name} ({user.user_trade_score})
        </h3>
      </div>
    );
  });

  return <div className="users">{allUsers}</div>;
}

export default Users;
