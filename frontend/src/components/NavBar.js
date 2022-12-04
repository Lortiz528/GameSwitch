import SearchBar from './SearchBar'
import logo from './logo.png'
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import './NavBar.css'
function NavBar() {
  return (
    <Navbar className=' nav-bar' sticky='top'>
      <Link to='/'>
        <img src={logo} alt='logo' className='logo' />
      </Link>
      <SearchBar />
      <div>
        <button>
          <Link to='/userprofile'>User Profile</Link>
        </button>
        <button>
          <Link to='/users'>Users</Link>
        </button>
        <button>
          <Link to='signup'>Sign Up</Link>
        </button>
        <button>
          <Link to='login'>Login</Link>
        </button>
      </div>
    </Navbar>
  )
}

export default NavBar
