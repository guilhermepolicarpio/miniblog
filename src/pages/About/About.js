import React from "react"
import styles from "./About.module.css"

import { Link } from "react-router-dom"

const About = () => {
    return (
        <div className={styles.about}>

            <h1>About Mini <span>Blog</span></h1>
            <p>this project consists of a blog made in react on the front-end and firebase on the back-end </p>

            <Link to="/posts/create" className="btn">
                Create Post
            </Link>
        </div>
    )
}

export default About;