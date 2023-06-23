import React from "react";
import "../Header/Header.css";
import headerimg from "./../../Assets/headerimg.png";

function Header() {
  return (
    <div className="header-component">
      <div className="header-component-image">
        <img className="headerimg" src={headerimg} alt="header-img"></img>
      </div>
      <div className="header-component-content">
        <h1>Add your products and give<br></br>your valuable feedback</h1>
        <p>
          Easily give your feedback in a matter of minutes. Access your<br></br>audience
          on all platforms. Observe result manually in real time
        </p>
      </div>
    </div>
  );
}

export default Header;
