import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link} from 'react-router-dom'
const API = process.env.REACT_APP_API_URL

function SearchBar() {
  const [games, setGames] = useState([])
  const [userInput, setUserInput] = useState('')

  useEffect(() => {
    axios
      .get(`${API}/games`)
      .then((res) => {
        setGames(res.data.payload)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  const inputHandler = (event) => {
    let textLowerCase = event.target.value.toLowerCase()
    setUserInput(textLowerCase)
  }

  // const handleClick = () => {}
  return (
    <>
      <label>search for games</label>
      <input input='text' onChange={inputHandler} placeholder='Enter Games' />
      {/* <button onClick={handleClick}>type game to search</button> */}
      {userInput.length > 0
        ? games
            .filter((game) => game.game_name.toLowerCase().includes(userInput))
            .map((game, index) => (
              <ul key={index}>
                <Link to={`/games/${game.game_id}`}>{game.game_name}</Link>
              </ul>
            ))
        : null}
    </>
  )
}

export default SearchBar
