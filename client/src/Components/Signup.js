import React, { useState } from "react";
import Home from "./Home";
import "./Component.css";
import Login from "./Login";

function Signup() {

// Add this in your component file
  // React States
  
  const [isSubmitted2, setIsSubmitted2] = useState(false);

  const errors2 = {
    uname: "invalid username",
    pass: "invalid password",
    
    fname: "give a proper full name"
  };

  async function handleSubmit2(event) {
    //Prevent page reload
    event.preventDefault();

    let { uname, pass, img, fname } = document.forms[1];


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
  setIsSubmitted2(true)          
  }

  // JSX code for login form
  const renderForm2 = (
    <div className="form2">

      <form onSubmit={handleSubmit2}>
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
      <div className="signup-form">
        <div className="title">Sign Up</div>
        {isSubmitted2 ? "Now LogIn" : renderForm2}
      </div>
    </div>
  );
}

export default Signup;