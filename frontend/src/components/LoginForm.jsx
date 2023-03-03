import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleemailChange = (event) => {
        setemail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Make API request to log in user
        fetch("/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => {
                if (response.created) {
                    // Login successful, redirect to home page
                    navigate("/");
                } else {
                    // Login failed, do something here
                    console.error("Login failed");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <h2>Login Page</h2>
            <form onSubmit={handleFormSubmit}>
                <label>
                    email:
                    <input
                        type="text"
                        value={email}
                        onChange={handleemailChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;
