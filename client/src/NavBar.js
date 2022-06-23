import React from "react";
import { NavLink } from "react-router-dom"
import Login from "./Components/Login";

function NavBar({setLoggedInUser}) {
    

    return (
        <nav>
            <NavLink to="/gear">Gear</NavLink>
            <NavLink to="/photofeed">Pictures</NavLink>
            <NavLink to="/forums">Forum</NavLink>
            <button onClick={() => setLoggedInUser(null)}> LOG OUT</button>
            
        
        </nav>
    );
}

export default NavBar;