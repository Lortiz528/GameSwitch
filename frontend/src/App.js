import './App.css'
// import Edit from './Pages/Edit'
// import FourOFour from './Pages/FourOFour'
import Home from './pages/Home'
import UsersIndex from './pages/UsersIndex'
// import New from './Pages/New'
// import Show from './Pages/Show'
import { Routes, Route } from 'react-router-dom'
// import NavBar from './Components/NavBar'
// import Map from './Components/Map'
// import { useEffect, useState } from 'react'

function App() {
  return (
    <div className='App'>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/users' element={<UsersIndex/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
