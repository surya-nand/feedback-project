import React from "react";
import "../Navbar/Navbar.css";
import { useNavigate, useLocation } from "react-router";
import passportimg from "./../../Assets/passport.jpg"

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedInUser = location.state && location.state.loggedInUser;

  function handlesignupButton() {
    navigate("/signup");
  }
  function handleLoginButton() {
    navigate("/login");
  }

  function handleLogoutButton (){
    navigate("/login")
  }
  return (
    <div className="navbar-component">
      <div className="navbar-elements">
        <h1 className="navbar-component-title">Feedback</h1>
        {loggedInUser ? (
          <div className="navbar-loggedin">
            <button onClick={handleLogoutButton} class="navbar-component-logout">Log Out</button>
            <div className="navbar-image">
              <img className="navbar-pp-image" src={passportimg} alt='passportimg'></img>
            </div>
          </div>
        ) : (
          <div className="navbar-signup">
          <button
            onClick={handleLoginButton}
            className="navbar-component-login"
          >
            Log in
          </button>
          <button
            onClick={handlesignupButton}
            className="navbar-component-signup"
          >
            Sign up
          </button>
        </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
