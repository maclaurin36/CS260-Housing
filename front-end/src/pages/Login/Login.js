import {authContext} from '../../components/AuthProvider/AuthProvider.js';
import {useContext, useState} from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    
    const { onLogin } = useContext(authContext);
    
    const login = async () => {
        try {
            const newToken = await axios.post('/api/housing/login', {
                username: username,
                password: password
            });
            onLogin(newToken, username);
        }
        catch (error) {
            setMessage("Invalid login credentials!");
        }
    };
    
    return (
        <div class="login-page-container">
            <h1> Login Details </h1>
            <div class="login-container">
                <div class="form-item">
                    <label>
                        <span class="label-name">Username:</span>
                        <input class="textbox" type="text" placeholder="John Doe" onChange={(e) => setUsername(e.target.value)}/>
                    </label>
                </div>
                <div class="form-item">
                    <label>
                        <span class="label-name">Password:</span>
                        <input class="textbox" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                </div>
                <button class="login-button" onClick={(e) => login()}>Sign In</button>
                {
                    message && (
                        <p>{message}</p>
                    )
                }
            </div>
            
        </div>
    );
};

export default Login;