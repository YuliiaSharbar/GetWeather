import React from "react";

function WeatherCard({ weather }) {
    return (
        <div className="weather-card">
            <h2>{weather.city}</h2>
            <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt="weather icon"
                className="weather-icon"
            />
            <p>{weather.temperature}°C</p>
            <p>Опис: {weather.description}</p>
            <p>Вологість: {weather.humidity}%</p>
            <p>Тиск: {weather.pressure} hPa</p>
            <p>Вітер: {weather.windSpeed} м/с</p>
        </div>
    );
}

export default WeatherCard;
