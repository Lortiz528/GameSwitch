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

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersIndex />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
