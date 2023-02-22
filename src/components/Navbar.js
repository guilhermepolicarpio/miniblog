import React from "react"
import styles from "./Navbar.module.css"
import { NavLink } from "react-router-dom"

import { useAuthentication } from "../hooks/useAuthentication"
import { useAuthValue } from "../context/AuthContext"

const Navbar = () => {

    const { user } = useAuthValue();
    return (
        <>
            <nav className={styles.navbar}>
                <NavLink to="/" className={styles.brand}>
                    Mini <span>Blog</span>
                </NavLink>

                <ul className={styles.links_list}>
                    <li>
                        <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>
                            <span>Home</span>
                        </NavLink>
                    </li>
                    {!user && (
                        <>
                            <li>
                                <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : "")}>
                                    <span>Login</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : "")}>
                                    <span>Register</span>
                                </NavLink>
                            </li>
                        </>
                    )}
                    {user && (
                        <>
                            <li>
                                <NavLink to="/posts/create" className={({ isActive }) => (isActive ? styles.active : "")}>
                                    <span>New Post</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : "")}>
                                    <span>Dashboard</span>
                                </NavLink>
                            </li>
                        </>
                    )}
                    <li>
                        <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : "")}>
                            <span>About</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;