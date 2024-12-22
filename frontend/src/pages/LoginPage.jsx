import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../API";
import ReCAPTCHA from "react-google-recaptcha"; // Import ReCAPTCHA component

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [recaptchaToken, setRecaptchaToken] = useState(null); // State for reCAPTCHA token
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if reCAPTCHA token is valid
            if (!recaptchaToken) {
                alert("Please complete the reCAPTCHA");
                return;
            }

            const response = await login({ email, password, recaptchaToken }); // Include recaptcha token
            console.log(response);
            localStorage.setItem("token", response.data.token);
            navigate("/task");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <ReCAPTCHA
                    sitekey="6Lei-icqAAAAALhWTl5D96p_EdARKSNDk2LBFnBV" // Replace with your actual Site Key
                    onChange={(value) => setRecaptchaToken(value)} // Set the reCAPTCHA token
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
