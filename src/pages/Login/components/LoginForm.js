import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../../../utils/Firebase/Users/users.firebase";


export function LoginForm() {
    const [email, setEmail] = useState("test@gmail.com");
    const [password, setPassword] = useState("password");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }
        try {
            await signInUser({ email, password })
            navigate("/")
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error: ${errorCode} - ${errorMessage}`);
            setError(`Error: ${errorCode} - ${errorMessage}`);
        }
    };

    const redirectToRegister = (e) => {
        e.preventDefault();
        navigate("/register");
    }

    return (
        <div>
            <form>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit" onClick={handleLogin}>Login</button>
                <button type="register" onClick={redirectToRegister}>Sign Up / Register</button>
            </form>
            {error && <code>{error}</code>}
        </div>
    );
}
