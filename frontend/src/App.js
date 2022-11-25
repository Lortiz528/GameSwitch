import './App.css'
import FourOFour from './pages/FourOFour'
// import Edit from './Pages/Edit'
import Home from './pages/Home'
import UsersIndex from './pages/UsersIndex'
// import New from './Pages/New'
// import Show from './Pages/Show'
<<<<<<< HEAD
import About from './pages/About'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Signup from './firebaseTest/Signup'
import Login from './firebaseTest/Login'
import UserProfile from './components/UserProfile'
import ResetPassWord from './firebaseTest/ResetPassword'
import UserProfileUpdate from './components/UserProfileUpdate'
import { CurrentUserContext } from './components/CurrentUserContext'
import { useEffect, useState } from 'react'
import GameSwitchDescription from './pages/GameSwitchDescription'
import GameDetail from './components/GameDetail'
=======
import About from "./pages/About";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Signup from "./firebaseTest/Signup";
import Login from "./firebaseTest/Login";
import UserProfile from "./components/UserProfile";
import ResetPassWord from "./firebaseTest/ResetPassword";
import UserProfileUpdate from "./components/UserProfileUpdate";
import { CurrentUserContext } from "./components/CurrentUserContext";
import { useEffect, useState } from "react";
import GameSwitchDescription from "./pages/GameSwitchDescription";
import GameCollection from "./gamecollection/GameCollection";
>>>>>>> 2a8260211213b4d6b155c2e9ed8228d28b8522ba
function App() {
  //stores the user info throughout the whole app
  const [currentUser, setCurrentUser] = useState({})

  return (
    <div className='App'>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <NavBar />
        <main>
          <Routes>
<<<<<<< HEAD
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<UsersIndex />} />
            <Route path='/about' element={<About />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/userprofile' element={<UserProfile />} />
            <Route path='/resetpassword' element={<ResetPassWord />} />
            <Route path='/updateprofile' element={<UserProfileUpdate />} />
            <Route path='/tutorial' element={<GameSwitchDescription />} />
            <Route path='/games/:gameId' element={<GameDetail />} />
            <Route path='*' element={<FourOFour />} />
=======
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UsersIndex />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/resetpassword" element={<ResetPassWord />} />
            <Route path="/updateprofile" element={<UserProfileUpdate />} />
            <Route path="/gamecollection" element={<GameCollection />} />
            <Route path="/tutorial" element={<GameSwitchDescription />} />
            <Route path="*" element={<FourOFour />} />
>>>>>>> 2a8260211213b4d6b155c2e9ed8228d28b8522ba
          </Routes>
        </main>
      </CurrentUserContext.Provider>
    </div>
<<<<<<< HEAD
  )
=======
  );
>>>>>>> 2a8260211213b4d6b155c2e9ed8228d28b8522ba
}

export default App
