
import  { useEffect, useState } from 'react';
import '../assets/css/custom.css'; 
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../axiosConfig';




const LoginPage = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate("/configuration"); 
        }
    }, [navigate]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        if (name === 'password') setPassword(value);
    };

    const handleFormSubmit = async (e) => {
       
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/login', { username, password }, { referrerPolicy: "unsafe-url" });
            localStorage.setItem('token', response.data.token);
            setMessage('Login successful!');

            navigate("/configuration");
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };
    const registerButton = () => {
        navigate("/register");
}
  
    

    return (

        <div className="login-container">
            <div className="card">
                <img className="logo" src="https://www.panteon.games/wp-content/themes/panteon/assets/img/logo.png" alt=""/>

                <h2>Login</h2>
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
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleInputChange}
                        required />
                    <button type="submit">Login</button>
                </form>
                <p onClick={registerButton} className="register-text">Register</p>

                {message && <p className="error-message">{message}</p>}
            </div>
        </div>
        
    );
};

export default LoginPage;
