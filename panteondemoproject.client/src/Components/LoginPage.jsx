
import  { useState } from 'react';
import axios from 'axios';
import '../assets/css/custom.css'; 
import { useNavigate } from "react-router-dom";




const LoginPage = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        if (name === 'password') setPassword(value);
    };

    const handleFormSubmit = async (e) => {
       
        e.preventDefault();
        try {
             await axios.post('https://localhost:7059/api/Auth/login', { username, password });
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
        //<div className="login-container">
        //    <div className="login-form">
        //        <img src="https://www.panteon.games/wp-content/themes/panteon/assets/img/logo.png" alt="" width="400" height="100"/>
        //        <h2>Login</h2>
        //        <form onSubmit={handleFormSubmit}>
        //            <div className="form-group">
        //                <label htmlFor="username">Username</label>
        //                <input
        //                    type="text"
        //                    id="username"
        //                    name="username"
        //                    value={username}
        //                    onChange={handleInputChange}
        //                    required
        //                />
        //            </div>
        //            <div className="form-group">
        //                <label htmlFor="password">Password</label>
        //                <input
        //                    type="password"
        //                    id="password"
        //                    name="password"
        //                    value={password}
        //                    onChange={handleInputChange}
        //                    required
        //                />
        //            </div>
        //            <button type="submit">Login</button>
        //        </form>
        //        {message && <p className="error-message">{message}</p>}
        //    </div>
        //</div>
    );
};

export default LoginPage;
