import { apiConnect } from "../api/client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const data = await apiConnect("/auth/register", {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });
        localStorage.setItem("token", data.token);
        navigate("/")
    } catch (error) {
        console.log(error.message)
    }
    }   

    return (
        <main className="auth-page">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Register</h2>

                <input
                name="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />

                <input
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Register</button>
            </form>
        </main>
    )   
}
