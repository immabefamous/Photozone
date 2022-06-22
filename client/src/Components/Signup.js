import React, { useState } from "react";
import Home from "./Home";
import "./Component.css";

function Signup() {

// Add this in your component file
  // React States
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
    
    fname: "give a proper full name"
  };

  async function handleSubmit(event) {
    //Prevent page reload
    event.preventDefault();

    let { uname, pass, img, fname } = document.forms[0];


   await fetch('http://localhost:3000/users', {
            method: 'POST', 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: fname.value,
                image: img.value,
                username: uname.value,
                password: pass.value,
            }
            ) },  
            )
  setIsSubmitted(true)          
  }

  // JSX code for login form
  const renderForm = (
    <div className="form">

      <form onSubmit={handleSubmit}>
        {/* First and Last Name */}
        <div className="input-container">
          <label>Full Name </label>
          <input type="text" name="fname" required />
          
        </div>
        {/* Image */}
        <div className="input-container">
          <label>Image</label>
          <input type="text" name="img" required />
          
        </div>
        
      {/* User Name */}
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          
        </div>
        {/* Password */}
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          
        </div>
        {/* Confirm Password */}
        <div className="input-container">
          <label>Confirm Password </label>
          <input type="password" name="pass" required />
          
        </div>
        <div className="button-container">
          <input type="submit" value="Signup"/>

        </div>
      </form>
    </div>
  );

  

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign Up</div>
        {isSubmitted ? <Home /> : renderForm}
      </div>
    </div>
  );
}

export default Signup;