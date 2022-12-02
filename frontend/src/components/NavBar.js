import SearchBar from './SearchBar'
import logo from './logo.png'
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import './NavBar.css'
function NavBar() {
  return (
    <Navbar className=' justify-content-between' bg='dark' sticky='top'>
      <Link to='/'>
        <img src={logo} alt='logo' width={100} />
      </Link>
      <SearchBar />
      <div className='button-nav'>
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
