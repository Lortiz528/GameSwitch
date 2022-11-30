import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './SearchBar.css'
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

  const SearchHandleClick = (input) => {
    setUserInput(input)
    // console.log('input is', input)
  }

  return (
    <div>
      <input
        input='text'
        onChange={inputHandler}
        value={userInput}
        placeholder='Search Games'
        class='form-control mr-sm-2'
      />
      {/* <button onClick={() => SearchHandleClick(userInput)}>Search</button> */}
      <div className='dropdown'>
        {userInput.length > 0
          ? games
              .filter(
                (game) =>
                  game.game_name.toLowerCase().includes(userInput) &&
                  game.game_name.toLowerCase() !== userInput
              )
              .map((game, index) => (
                <ul
                  className='dropdown-row'
                  key={index}
                  onClick={() => SearchHandleClick(game.game_name)}
                >
                  <Link to={`/games/${game.game_id}`}>{game.game_name}</Link>
                </ul>
              ))
          : null}
      </div>
    </div>
  )
}

export default SearchBar
