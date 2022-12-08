import { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState("");

    const handleLogin = async (newToken, username) => {

        setToken(newToken);
        setUsername(username);
        navigate('/');
    };

    const handleLogout = () => {
        setToken(null);
        setUsername("");
    };

    const value = {
        token,
        username,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export const authContext = AuthContext;