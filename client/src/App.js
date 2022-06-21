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

function App() {
  return (
    <div className="App">
      <h1>PhotoZone!</h1>
      <h6>all things photography</h6>
        <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="gear" element={<Gear />} />
        <Route path="photofeed" element={<Pictures />} />
        <Route path="forums" element={<Forum />} />
      </Routes>
      

    </div>
  );
}

export default App;
