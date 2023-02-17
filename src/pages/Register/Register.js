import { styles } from "./Register.module.css"

import { useState, useEffect } from "react";

const Register = () => {
    return (
        <div>
            <h1>Register to post</h1>
            <p>Create your user and share your stories</p>
            <form>
                <label>
                    <span>Name: </span>
                    <input
                        type="text"
                        name="displayName"
                        required
                        placeholder="Username" />
                    <span>E-mail: </span>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="E-mail" />
                    <span>Password </span>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Password" />
                    <span>Confirm Password </span>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Confirm Password" />
                </label>
                <button className="btn">Register</button>
            </form>
        </div>
    )
}

export default Register;