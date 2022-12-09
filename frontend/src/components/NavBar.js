import SearchBar from './SearchBar'
import logo from './logo.png'
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import { useContext } from 'react'
import SignOut from '../firebaseTest/Signout'
import { CurrentUserContext } from './CurrentUserContext'
import './NavBar.css'

function NavBar() {
  const { currentUser } = useContext(CurrentUserContext)
 
  return (
    <Navbar className=' nav-bar' sticky='top'>
      <Link to='/'>
        <img src={logo} alt='logo' className='logo' />
      </Link>
      <SearchBar />
      <div>
        <button className='button'>
          <Link to='/users'>Users</Link>
        </button>
        {Object.keys(currentUser).length ? (
          <>
            <button className='button'>
              <Link to='/userprofile' className='userprofile'>
               {currentUser.user_name}'s profile
              </Link>
            </button>
            <SignOut />
          </>
        ) : (
          <>
            <button className='button'>
              <Link to='login'>Login</Link>
            </button>
            <button className='button'>
              <Link to='signup'>Sign Up</Link>
            </button>
          </>
        )}
      </div>
    </Navbar>
  )
}

export default NavBar
