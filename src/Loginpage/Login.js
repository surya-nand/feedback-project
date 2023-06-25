import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useEffect, useState } from "react";
import Emailimg from "./../Assets/emailimg.png";
import Passwordimg from "./../Assets/passwordimg.png";
import axios from "axios";
const Base_URL = 'https://feedback-server-rn39.onrender.com'

const Login = () => {

  const [loginData, setLoginData] = useState({
    LoginEmail: "",
    LoginPassword: "",
  });

  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${Base_URL}/api/users`)
      .then((res) => {
        let users_data = res.data;
        setRegisteredUsers(users_data);
      })
      .catch((error10) => {
        console.log(error10);
      });
  }, []);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }


  const navigate = useNavigate();

  function handlesignupButton() {
    navigate("/signup");
  }

  async function handleLoginButton (e){
    e.preventDefault()
    const existingUser = registeredUsers.find(
        (user) => user.SignupEmail === loginData.LoginEmail
    )
    if (!existingUser) {
        // Email does not exist, navigate to signup page
        window.alert("User doesnot exist. Please register first")
        navigate("/signup");
      } else if (existingUser.SignupPassword === loginData.LoginPassword) {
        // Password is correct
        window.alert(`welocme ${existingUser.SignupName}!`)
        navigate("/", {
          // Pass the logged in user details as props to the `/` page
          state: {
            loggedInUser: existingUser,
          },
        });


      } else {
        // Incorrect password
        window.alert("Please enter correct password")
      }
    }

  return (
    <form>
      <div className="login-page">
        <div className="login-title">
          <h1>Feedback</h1>
          <p> Add your products and give us your valuable feedback</p>
        </div>
        <div className="login-details">
          <div className="login-email">
            <img src={Emailimg} alt="email-img"></img>
            <input
              className="login-email-input"
              type="email"
              name="LoginEmail"
              value = {loginData.LoginEmail}
              placeholder="Email"
              onChange={handleInputChange}
              required
            ></input>
            <div className="login-email-line"></div>
          </div>
          <div className="login-password">
            <img src={Passwordimg} alt="password-img"></img>
            <input
              className="login-password-input"
              type="password"
              name="LoginPassword"
              value={loginData.LoginPassword}
              placeholder="Password"
              onChange={handleInputChange}
              required
            ></input>
            <div className="login-password-line"></div>
          </div>
          <div className="Account-signup">
            <p>Don't have an account?</p>
            <button className="signup-button" onClick={handlesignupButton}>
              <h1>Signup</h1>
            </button>
          </div>
          <div className="login-division">
            <button
              onClick={handleLoginButton}
              type="submit"
              className="login-button"
              value='submit'
            >
              <div className="login-button-division">
                <p>Log in</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
