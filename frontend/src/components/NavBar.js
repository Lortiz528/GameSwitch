import SearchBar from './SearchBar'
import logo from './logo.png'
import { Link } from 'react-router-dom'
function NavBar() {
  return (
    <div class='navbar bg-primary justify-content-between'>
      <Link to='/'>
        <img src={logo} alt='logo' width={150} />
      </Link>
      <div class='d-flex justify-content-between'>
        <SearchBar />
        <button>
          <Link to='signup'>Sign Up</Link>
        </button>
        <button>
          <Link to='login'>Login</Link>
        </button>
      </div>
    </div>
  )
}

export default NavBar
