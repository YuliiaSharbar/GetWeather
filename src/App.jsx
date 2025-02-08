import React, { useState } from "react";
import SearchInput from "./components/SearchInput";
import WeatherCard from "./components/WeatherCard";
import "./index.css";

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [isTomorrow, setIsTomorrow] = useState(false);
    const [showToggle, setShowToggle] = useState(false);

    return (
        <div className="container">
            <h1 className="title">
                GetWeather <span className="yellow">☀️</span>
            </h1>
            <SearchInput setWeatherData={setWeatherData} setShowToggle={setShowToggle} isTomorrow={isTomorrow} />
            {weatherData && <WeatherCard weather={weatherData} />}
            {showToggle && (
                <div className="toggle-container">
                    <label className="toggle-switch">
                        <span>Today</span>
                        <input
                            type="checkbox"
                            checked={isTomorrow}
                            onChange={() => setIsTomorrow(!isTomorrow)}
                        />
                        <span>Tomorrow</span>
                    </label>
                </div>
            )}
        </div>
    );
}

export default App;
