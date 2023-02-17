import React from "react"
import { styles } from "./Navbar.module.css"
import { NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <>
            <nav>
                <NavLink to="/">
                    Mini <span>Blog</span>
                </NavLink>
           
            <ul>
                <li>
                    <NavLink to="/">
                        <span>Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about">
                        <span>About</span>
                    </NavLink>
                </li>
            </ul>
            </nav>
        </>
    )
}

export default Navbar;