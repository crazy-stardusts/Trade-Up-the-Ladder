import React from "react";
import { Route, Routes} from "react-router-dom";
import LoginForm from "./components/LoginForm";
// import SignupForm from "./SignupForm";
import HomePage from "./components/HomePage";

function App() {
    return (
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginForm />} />
                {/* <Route path="/signup" element={<SignupForm />} /> */}
            </Routes>
    );
}

export default App;
