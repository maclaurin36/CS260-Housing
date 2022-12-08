import {useState} from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    
    const register = async () => {
        setLoading(true);
        setMessage(null);
        try {
            await axios.post("/api/housing/register", {
                username: username,
                password: password
            });
            
            setUsername("");
            setPassword("");
            setMessage("User created successfully!");
        }
        catch (error) {
            setMessage("User already exists!");
        }
        
        setLoading(false);
    };
    
    return (
        <div class="register-page-container">
            <h1> Register An Admin </h1>
            <div class="register-container">
                <div class="form-item">
                    <label>
                        <span class="label-name">Username:</span>
                        <input class="textbox" type="text" value={username} placeholder="John Doe" onChange={(e) => setUsername(e.target.value)}/>
                    </label>
                </div>
                <div class="form-item">
                    <label>
                        <span class="label-name">Password:</span>
                        <input class="textbox" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                </div>
                <button class="register-button" onClick={(e) => register()}>{!loading ? "Register" : "Saving..."}</button>
                {
                    message && (
                        <p>{message}</p>
                    )
                }
            </div>
            
        </div>
    );
};

export default Register;