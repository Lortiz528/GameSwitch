import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
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
      <Col>
        <div class="card" style={{ width: '175px' }} key={index}>
          <h2 class="card-header">{user.user_name}</h2>
          <div class="card-body">
            <Link to={`/users/${user.user_email}`}>
              <img
                class="card-img-bottom"
                style={{ height: '175px' }}
                src={user.user_avatar}
              />
            </Link>
          </div>
        </div>
      </Col>
    );
  });

  return (
    <Container>
      <Row xs={1} md={5}>
        {allUsers}
      </Row>
    </Container>
  );
}

export default Users;
