import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { toast, ToastContainer } from 'react-toastify'
import './Signup.css'

//firebase import
import auth from './firebaseAuth'
import { createUserWithEmailAndPassword } from 'firebase/auth'

//API url
const API = process.env.REACT_APP_API_URL

function Signup() {
  const [userInput, setUserInput] = useState({
    user_name: '',
    user_email: '',
    user_password: '',
    user_confirmPassWord: '',
  })

  const navigate = useNavigate()

  const signUp = () => {
    if (userInput.user_password === userInput.user_confirmPassWord) {
      createUserWithEmailAndPassword(
        auth,
        userInput.user_email,
        userInput.user_password
      )
        .then((cred) => {
          console.log(cred)
          // alert("you have signed up", cred);
          createNewUser()
        })
        .catch((error) => {
          console.log(error.message)
          alert(error.message)
        })
    } else {
      alert('Password not match')
    }
  }

  const createNewUser = () => {
    const newUser = { ...userInput }
    newUser.user_email = newUser.user_email.toLowerCase()

    axios
      .post(`${API}/users/newuser`, newUser)
      .then(() => {
        notify()
        // navigate("/");
      })
      .catch((error) => console.error('catch', error))
  }

  const handleTextChange = (event) => {
    setUserInput({ ...userInput, [event.target.id]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    signUp()
    setUserInput({
      user_name: '',
      user_email: '',
      user_password: '',
      user_confirmPassWord: '',
    })
  }
  const notify = () => {
    toast.success('You have successfully created a new account!', {
      position: 'top-center',
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      draggable: true,
      progress: undefined,
    })
    setTimeout(() => {
      navigate('/')
    }, 3100)
  }
  return (
    <section className='signup'>
      <h2>Create An Account</h2>
      <br />
      <Form onSubmit={handleSubmit} className='signUpForm'>
        <Form.Group className='mb-4'>
          {/* <Form.Label>User Name: </Form.Label> */}
          <Form.Control
            type='text'
            placeholder='Enter Username'
            id='user_name'
            value={userInput.user_name}
            onChange={handleTextChange}
            required
          />
        </Form.Group>

        <Form.Group className='mb-4'>
          {/* <Form.Label>Email: </Form.Label> */}
          <Form.Control
            type='email'
            placeholder='Enter Email'
            id='user_email'
            value={userInput.user_email}
            onChange={handleTextChange}
            required
          />
        </Form.Group>

        <Form.Group className='mb-4'>
          {/* <Form.Label>Password: </Form.Label> */}
          <Form.Control
            type='password'
            placeholder='Enter Password'
            id='user_password'
            value={userInput.user_password}
            onChange={handleTextChange}
            required
          />
        </Form.Group>

        <Form.Group className='mb-4'>
          {/* <Form.Label>Confirm Password: </Form.Label> */}
          <Form.Control
            type='password'
            placeholder='Confirmed Password'
            id='user_confirmPassWord'
            value={userInput.user_confirmPassWord}
            onChange={handleTextChange}
            required
          />
        </Form.Group>
        <button className='signup-button' type='submit'>
          Sign Up
        </button>
      </Form>
      <ToastContainer autoClose={2000} theme='light' />
      <br />
      <p>
        Already have an account?
        <span>
          <Link to='/login'> Login</Link>
        </span>
      </p>
    </section>
  )
}

export default Signup
