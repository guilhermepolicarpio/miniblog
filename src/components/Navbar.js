import React from "react"
import styles from "./Navbar.module.css"
import { NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <>
            <nav className={styles.navbar}>
                <NavLink to="/" className={styles.brand}>
                    Mini <span>Blog</span>
                </NavLink>
           
            <ul className={styles.links_list}>
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