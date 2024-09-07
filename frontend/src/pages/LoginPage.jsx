import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../API";

const LoginPage = () => {

    //states for the email and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await login({email, password});
            console.log(response);
            localStorage.setItem("token", response.data.token);
            navigate("/task");
        }catch(error){
            console.log(error);
        }
    }
    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;