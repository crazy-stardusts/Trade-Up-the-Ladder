import React from "react";
// import { useAuth } from "./AuthContext";
import LoginForm from "./LoginForm";

function HomePage() {
    // const { user } = useAuth();
    const user = null;
    if (user) {
        return <h1>Welcome, {user.email}!</h1>;
    } 
    return <div><LoginForm /></div>;
}

export default HomePage;
