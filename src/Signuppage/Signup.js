import React, { useState } from "react";
import "./signup.css";
import Emailimg from "./../Assets/emailimg.png";
import Passwordimg from "./../Assets/passwordimg.png";
import Mobileimg from "./../Assets/mobileimg.png";
import Nameimg from "./../Assets/nameimg.png";
import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect } from "react";


function Signup() {
  const navigate = useNavigate();

  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4500/api/users")
      .then((res) => {
        let users_data = res.data;
        setRegisteredUsers(users_data);
      })
      .catch((error10) => {
        console.log(error10);
      });
  }, []);

  const [signupData, setSignupData] = useState({
    SignupName: "",
    SignupEmail: "",
    SignupMobile: "",
    SignupPassword: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setSignupData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleLoginButton() {
    navigate("/login");
  }

  async function handleSignupButton(event) {
    event.preventDefault();
    const existingUser = registeredUsers.find(
      (user) => user.SignupEmail === signupData.SignupEmail
    );
    if(existingUser){
        window.alert("User already exists.Please Login")
        navigate('/login')
    }
    else{
        await fetch("http://localhost:4500/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(signupData),
          })
            .then((response) => response.json())
            .then((data) => {
              navigate("/", {
                // Pass the newly created user data as props to the `/` page
                state: {
                  loggedInUser: data,
                },
              });
            })
            .catch((error9) => {
              console.error("Error:", error9);
            })

    }



  }
  return (
    <form method="POST" onSubmit={handleSignupButton}>
      <div className="signup-page">
        <div className="signup-title">
          <h1>Feedback</h1>
          <p> Add your products and give us your valuable feedback</p>
        </div>
        <div className="signup-details-page">
          <div className="signup-name">
            <img src={Nameimg} alt="name-img"></img>
            <input
              className="signup-name-input"
              type="name"
              name="SignupName"
              required
              placeholder="Name"
              value={signupData.SignupName}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="signup-name-line"></div>
          <div className="signup-email">
            <img src={Emailimg} alt="email-img"></img>
            <input
              className="signup-email-input"
              type="email"
              name="SignupEmail"
              value={signupData.SignupEmail}
              required
              placeholder="Email"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="signup-email-line"></div>
          <div className="signup-mobile">
            <img src={Mobileimg} alt="mobile-img"></img>
            <input
              className="signup-mobile-input"
              type="tel"
              minLength="10"
              maxLength="10"
              name="SignupMobile"
              value={signupData.SignupMobile}
              required
              placeholder="Mobile"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="signup-mobile-line"></div>
          <div className="signup-password">
            <img src={Passwordimg} alt="password-img"></img>
            <input
              className="signup-password-input"
              type="password"
              name="SignupPassword"
              value={signupData.SignupPassword}
              minLength="5"
              required
              placeholder="Password"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="signup-password-line"></div>
          <div className="Account-login">
            <p>Already have an account?</p>
            <button onClick={handleLoginButton} className="login-button">
              <h1>Log in</h1>
            </button>
          </div>
          <div className="signup-division">
            <button type="submit" className="signup-button" value="submit">
              <div className="signup-button-division">
                <p>Sign in</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Signup;
