import "./App.css";
// import Edit from './Pages/Edit'
// import FourOFour from './Pages/FourOFour'
import Home from "./pages/Home";
import UsersIndex from "./pages/UsersIndex";
// import New from './Pages/New'
// import Show from './Pages/Show'
import About from "./pages/About";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Signup from "./firebaseTest/Signup";
import Login from "./firebaseTest/Login";
import UserProfile from "./components/UserProfile";
import { CurrentUserContext } from "./components/CurrentUserContext";
import { useEffect, useState } from "react";

function App() {
  //stores the user info throughout the whole app
  const [currentUser, setCurrentUser] = useState({});

  return (
    <div className="App">
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UsersIndex />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="userprofile" element={<UserProfile />} />
          </Routes>
        </main>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
