import { useState, useEffect } from 'react'
import axios from 'axios'
const API = process.env.REACT_APP_API_URL

function SearchBar() {
  const [userInput, setUserInput] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('hi')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>games</label>
        <br />
        <input type='text' />
        <input type='submit' value='Submit' />
      </form>
    </div>
  )
}

export default SearchBar
