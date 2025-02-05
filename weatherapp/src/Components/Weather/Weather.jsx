import { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
    const [city, setCity] = useState('Peshawar');  // Default city
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const search = (cityName) => {
        setLoading(true);
        setError(null);
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${import.meta.env.VITE_APP_ID}`)
            .then((response) => {
                setWeather(response.data);
                setLoading(false);
                setCity('')
            })
            .catch((error) => {
                console.error(error);
                setError("City not found. Please try again.");
                setLoading(false);
                setCity('')
                setWeather({});
            });
    };

    const formatTime = (timestamp) => {
        if (!timestamp) return '--';
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    useEffect(() => {
        search(city);
    }, []);

    return (
        <div className="weather">
            <div className="input-box">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter City Name"
                    autoComplete="on"
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            search(city);
                        }
                    }}
                />
                <button onClick={() => search(city)}>Search</button>
            </div>

            <div className="weather-info">
                {loading ? (
                    <p>🔍 Searching for weather data...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : weather.main ? (
                    <div>
                        <h2>{weather.name}, {weather.sys.country}</h2>
                        <p>🌡 Temperature: {weather.main.temp}°C</p>
                        <p>🙂 Feels Like: {weather.main.feels_like}°C</p>
                        <p>🔼 Max Temp: {weather.main.temp_max}°C | 🔽 Min Temp: {weather.main.temp_min}°C</p>
                        <p>💧 Humidity: {weather.main.humidity}%</p>
                        <p>🌬 Wind: {weather.wind.speed} m/s</p>
                        <p>🌅 Sunrise: {formatTime(weather.sys.sunrise)}</p>
                        <p>🌇 Sunset: {formatTime(weather.sys.sunset)}</p>
                        <p>🌎 Visibility: {weather.visibility / 1000} km</p>
                        <p>⚖ Pressure: {weather.main.pressure} hPa</p>
                        <p>🌤 Weather: {weather.weather[0].description}</p>
                    </div>
                ) : (
                    <p>Enter a city and click Search to get weather details.</p>
                )}
            </div>
        </div>
    );
};

export default Weather;
