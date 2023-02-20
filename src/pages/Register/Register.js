import { styles } from "./Register.module.css"

import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { createUser, error: authError, loading } = useAuthentication();
    const handleSubmit = async (e) => {
        e.preventDefault()

        setError("")

        const user = { displayName, email, password };

        if (password !== confirmPassword) {
            setError("The passwords doesn't match");
            return;
        }

        const res = await createUser(user)
    }

    useEffect(() => {
        if (authError) {
            setError(authError)
        }
    }, [authError]);

    return (
        <div>
            <h1>Register to post</h1>
            <p>Create your user and share your stories</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Name </span>
                    <input
                        type="text"
                        name="displayName"
                        required
                        placeholder="Username"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)} />
                    <span>E-mail </span>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                    <span>Password </span>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <span>Confirm Password </span>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
                {!loading && <button className="btn">Register</button>}
                {loading && <button className="btn" disabled>Wait...</button>}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}

export default Register;