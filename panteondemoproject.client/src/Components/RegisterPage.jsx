import { useState } from 'react';
import axios from 'axios';
import '../assets/css/custom.css'; 
import { useNavigate } from "react-router-dom";

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
            await axios.post('https://localhost:7059/api/Auth/register', { username, email, password });
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
        //<div>
        //    <h2>Register</h2>
        //    <form onSubmit={this.handleFormSubmit}>
        //        <div>
        //            <label>Username</label>
        //            <input
        //                type="text"
        //                name="username"
        //                value={username}
        //                onChange={this.handleInputChange}
        //                required
        //            />
        //        </div>
        //        <div>
        //            <label>Email</label>
        //            <input
        //                type="email"
        //                name="email"
        //                value={email}
        //                onChange={this.handleInputChange}
        //                required
        //            />
        //        </div>
        //        <div>
        //            <label>Password</label>
        //            <input
        //                type="password"
        //                name="password"
        //                value={password}
        //                onChange={this.handleInputChange}
        //                required
        //            />
        //        </div>
        //        <button type="submit">Register</button>
        //    </form>
        //    {message && <p>{message}</p>}
        //</div>
    );
};


export default RegisterPage;
