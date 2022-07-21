import React from "react";
import { NavLink } from "react-router-dom"
import Login from "./Components/Login";

function NavBar({setLoggedInUser}) {
    

    return (
        <nav>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/photofeed">Pictures</NavLink>
            <NavLink to="/forums">Forum</NavLink>
            <button id="logOut" onClick={() => setLoggedInUser(null)}> LOG OUT</button>
        </nav>
    );
}

export default NavBar;