import { useState } from 'react';
import '../assets/css/custom.css'; 
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../axiosConfig';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    }

    const handleFormSubmit = async (e) => {

        e.preventDefault();
        try {
           await axiosInstance.post('/auth/register', { username, email, password });
            setMessage('Register successful!');
            navigate("/");
        } catch (error) {
            setMessage(error.response?.data);
        }
    };
    const loginButton = () => {
        navigate("/");
    }

    return (

        <div className="login-container">
            <div className="card">
                <img className="logo" src="https://www.panteon.games/wp-content/themes/panteon/assets/img/logo.png" alt="" />

                <h2>Register</h2>
                <form onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleInputChange}
                        required />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleInputChange}
                        required />
                    <button type="submit">Register</button>
                </form>
                <p onClick={loginButton} className="login-text">Login</p>

                {message && <p className="error-message">{message}</p>}
            </div>
        </div>
       
    );
};


export default RegisterPage;
