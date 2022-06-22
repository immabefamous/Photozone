import logo from './logo.svg';
import React from "react";
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import Gear from "./Components/Gear";
import Pictures from "./Components/Pictures";
import Forum from "./Components/Forum";
import NavBar from "./NavBar";
import ForumPage from './Components/ForumPage';
import Signup from './Components/Signup';
import {useEffect, useState} from 'react';
import Login from './Components/Login';

function App() {
    const [loggedInUser, setLoggedInUser] = useState(null);
  
    useEffect(() => {
      // auto-login
      fetch("").then((r) => {
        if (r.ok) {
          r.json().then((user) => setLoggedInUser(user));
        }
      });
    }, []);
  
    if (!loggedInUser) return <Login setLoggedInUser={setLoggedInUser}/>;

    // async function handleLogoutClick() {
    //   if (document.getElementById("Login")) {

    //   let req = await fetch(`http://127.0.0.1:3000/sessions/${loggedInUser.id}`, {
    //           method: "PATCH",
    //           headers: {
    //               "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({
    //               subscription: "false",
    //           }),
    //       });

    //       let res = req.json()
    //       if (res.ok) setLoggedInUser(null)
    //   }

  return (
    <div className="App">
      <h1>PhotoZone!</h1>
      <h6>all things photography</h6>
        <NavBar />
      <Routes>
        <Route path="/" element={<Home loggedInUser={loggedInUser}/>} />
        <Route path="gear" element={<Gear loggedInUser={loggedInUser}/>} />
        <Route path="photofeed" element={<Pictures loggedInUser={loggedInUser}/>} />
        <Route path="forums" element={<Forum loggedInUser={loggedInUser}/>} />
        <Route path="signup" element={<Signup />} />
      </Routes>
      
      {/* <button id="login_logout" 
        onClick={() =>handleLogoutClick()}
        >
        </button> */}

    </div>
  );
}


export default App;
