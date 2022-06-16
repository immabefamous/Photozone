import React from "react";
import { NavLink } from "react-router-dom"

function NavBar() {
    return (
        <nav>
            <NavLink to="/gear">Gear</NavLink>
            <NavLink to="/photofeed">Pictures</NavLink>
            <NavLink to="/forums">Forum</NavLink>
            
        </nav>
    );
}

export default NavBar;