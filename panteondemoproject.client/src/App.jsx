
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import BuildingsConfigurationPage from './Components/BuildingsConfigurationPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './Components/PrivateRoute';



const App=() => {
    const navigate = useNavigate();

    return (

        <Routes>
            <Route path="/" element={<LoginPage navigate={navigate} />} />
            <Route path="/register" element={<RegisterPage navigate={navigate} />} />
            <Route element={<PrivateRoute />}>
                <Route path="/configuration" element={<BuildingsConfigurationPage />} />
                 Diðer korunan yollar 
            </Route>
        </Routes>
    );
};
const AppWrapper = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};

export default AppWrapper;

