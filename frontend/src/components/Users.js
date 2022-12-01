import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './Users.css'
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

  const allUsers = users.map((user, idx) => {
    return (
      <Card className='usercard' key={idx}>
        <Card.Title>{user.user_name}</Card.Title>
        <Card.Link href={`/users/${user.user_email}`}>
        <Card.Img className='userImage' src={user.user_avatar} alt={user.user_name}/>
        </Card.Link>
      </Card>
    );
  });

  return (
    <Container>
      <Row xs={2} md={5}>
        {allUsers}
      </Row>
    </Container>
  );
}

export default Users;
