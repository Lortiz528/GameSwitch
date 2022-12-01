import SearchBar from './SearchBar'
import logo from './logo.png'
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
function NavBar() {
  return (
    <Navbar className='justify-content-between' bg='dark'>
      <Link to='/'>
        <img src={logo} alt='logo' width={100} />
      </Link>
      <SearchBar />
      <div>
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
