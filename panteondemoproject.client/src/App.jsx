//import  { Component } from 'react';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import RegisterComponent from './Components/RegisterComponent';
//import LoginComponent from './Components/LoginComponent';

//class App extends Component {
//    render() {
//        return (
//            <Router>
//                <div>
//                    <h1>My Application</h1>
//                    <Routes>
//                        <Route path="/register" element={<RegisterComponent />} />
//                        <Route path="/" element={<LoginComponent />} />
//                        {/* Diðer rotalar burada tanýmlanabilir */}
//                    </Routes>
//                </div>
//            </Router>
//        );
//    }
//}

//export default App;

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import BuildingsConfigurationPage from './Components/BuildingsConfigurationPage';
import 'bootstrap/dist/css/bootstrap.min.css';



const App=() => {
    const navigate = useNavigate();

    return (

        <Routes>
            <Route path="/" element={<LoginPage navigate={navigate} />} />
            <Route path="/register" element={<RegisterPage navigate={navigate }/>} />
            <Route path="/configuration" element={<BuildingsConfigurationPage navigate={navigate }/>} />
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




//import { useEffect, useState } from 'react';
//import './App.css';

//function App() {
//    const [forecasts, setForecasts] = useState();

//    useEffect(() => {
//        populateWeatherData();
//    }, []);

//    const contents = forecasts === undefined
//        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
//        : <table className="table table-striped" aria-labelledby="tableLabel">
//            <thead>
//                <tr>
//                    <th>Date</th>
//                    <th>Temp. (C)</th>
//                    <th>Temp. (F)</th>
//                    <th>Summary</th>
//                </tr>
//            </thead>
//            <tbody>
//                {forecasts.map(forecast =>
//                    <tr key={forecast.date}>
//                        <td>{forecast.date}</td>
//                        <td>{forecast.temperatureC}</td>
//                        <td>{forecast.temperatureF}</td>
//                        <td>{forecast.summary}</td>
//                    </tr>
//                )}
//            </tbody>
//        </table>;

//    return (
//        <div>
//            <h1 id="tableLabel">Weather forecast</h1>
//            <p>This component demonstrates fetching data from the server.</p>
//            {contents}
//        </div>
//    );
    
//    async function populateWeatherData() {
//        const response = await fetch('weatherforecast');
//        const data = await response.json();
//        setForecasts(data);
//    }
//}

//export default App;