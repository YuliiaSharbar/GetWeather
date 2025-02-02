import React from "react";

function WeatherCard({ weatherData }) {
  return (
    <div className="weather-card">
      <h2>{weatherData.city}</h2>
      <p>{weatherData.temperature}°C</p>
    </div>
  );
}

export default WeatherCard;