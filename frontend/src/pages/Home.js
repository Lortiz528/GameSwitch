import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Welcome Game Switch NYC !</h2>
      <br></br>
      <button>
        <Link to="userprofile">User Profile</Link>
      </button>
      <br></br>
      <br></br>
      <button>
        <Link to="resetpassword">Reset Password</Link>
      </button>
      <br></br>
      <br></br>
      <button>
        <Link to="updateprofile">Update Profile</Link>
      </button>
      <br></br>
      <br></br>
      <button>
        <Link to="gamecollection">Game Collection</Link>
      </button>
    </div>
  );
}
export default Home;
